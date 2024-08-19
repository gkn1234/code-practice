import { argv } from 'node:process'
import { Agent } from 'node:https'
import { access, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import axios from 'axios'
import html2md from 'html-to-md'
import { isNumStr } from '@/utils'

const CODERS = ['gkn', 'lx']
const LEETCODE_URL = 'https://leetcode.cn'

const request = axios.create({
  baseURL: LEETCODE_URL,
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
})

const [
  ,,
  inputOrder = '',
] = argv

if (!isNumStr(inputOrder)) {
  throw new Error('题目序号必须为数字')
}

const order = Math.floor(Number(inputOrder))

if (order <= 0) {
  throw new Error('题目序号必须大于0')
}

const {
  title,
  difficulty,
  key,
  tags,
} = await getQuestionByOrder(order)
const content = await getQuestionContent(key)
const { code, functionName } = await getQuestionEditorCode(key)

const folderName = `${order}-${difficulty}-${title}`
const folderPath = leetcodeDir(folderName)
const testCasesPath = join(folderPath, '__tests__')
const accessable = await access(folderPath).then(() => true).catch(() => false)

if (accessable) {
  throw new Error('题目已存在')
}

await mkdir(folderPath, { recursive: true })
await mkdir(testCasesPath, { recursive: true })

await generateUserCodes(code, functionName, CODERS, folderPath)
await generateReadme(
  order,
  key,
  difficulty,
  title,
  content,
  tags,
  folderPath,
)
await generateTestCases(testCasesPath)

function leetcodeDir(...paths) {
  return join('leetcode', ...paths)
}

async function getQuestionByOrder(questionOrder) {
  const res = await request.post('/graphql', {
    query: `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        hasMore
        total
        questions {
          acRate
          difficulty
          freqBar
          frontendQuestionId
          isFavor
          paidOnly
          solutionNum
          status
          title
          titleCn
          titleSlug
          topicTags {
            name
            nameTranslated
            id
            slug
          }
          extra {
            hasVideoSolution
            topCompanyTags {
              imgUrl
              slug
              numSubscribed
            }
          }
        }
      }
    }`,
    variables: {
      categorySlug: 'all-code-essentials',
      skip: questionOrder - 1,
      limit: 1,
      filters: {},
    },
    operationName: 'problemsetQuestionList',
  })

  const {
    topicTags = [],
    titleSlug = '',
    difficulty = '',
    titleCn = '',
  } = res.data?.data?.problemsetQuestionList?.questions[0] || {}

  if (!titleSlug) {
    throw new Error('题目不存在')
  }

  return {
    title: titleCn,
    difficulty,
    key: titleSlug,
    tags: topicTags.map(tag => ({
      name: tag.nameTranslated,
      slug: tag.slug,
    })),
  }
}

async function getQuestionContent(questionKey) {
  const res = await request.post('/graphql', {
    query: `query questionTranslations($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        translatedTitle
        translatedContent
      }
    }`,
    variables: {
      titleSlug: questionKey,
    },
    operationName: 'questionTranslations',
  })

  let {
    translatedTitle = '',
    translatedContent = '',
  } = res.data?.data?.question || {}

  if (translatedTitle) {
    translatedContent = html2md(translatedContent)
  }

  return translatedContent
}

async function getQuestionEditorCode(questionKey) {
  const res = await request.post('/graphql', {
    query: `query questionEditorData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        questionFrontendId
        codeSnippets {
          lang
          langSlug
          code
        }
        envInfo
        enableRunCode
        hasFrontendPreview
        frontendPreviews
      }
    }`,
    variables: {
      titleSlug: questionKey,
    },
    operationName: 'questionEditorData',
  })

  const {
    codeSnippets = [],
  } = res.data?.data?.question || {}

  const target = codeSnippets.find(snippet => snippet.langSlug === 'typescript')
  let code = ''
  let functionName = ''
  if (target && target.code) {
    functionName = target.code.match(/function (\w+)/)?.[1] || ''
    const index = target.code.indexOf('function')
    code = `${target.code.slice(0, index)}export ${target.code.slice(index)}`
  }

  return { code, functionName }
}

function generateUserCodes(codeStr, funcNameStr, coderList, codeFolder) {
  const promises = []
  coderList.forEach((coder) => {
    promises.push(
      generateUserCode(codeStr, coder, codeFolder),
    )
  })

  promises.push(
    generateIndex(funcNameStr, coderList, codeFolder),
  )

  return Promise.all(promises)
}

async function generateUserCode(codeStr, coderName, codeFolder) {
  const fileName = `${coderName}.ts`
  await writeFile(
    join(codeFolder, fileName),
    codeStr,
    'utf-8',
  )
}

async function generateIndex(funcNameStr, coderList, codeFolder) {
  const fileName = 'index.ts'
  let indexCodeStr = ''
  coderList.forEach((coderName) => {
    indexCodeStr += `export { ${funcNameStr} as ${coderName} } from './${coderName}'\n`
  })
  await writeFile(
    join(codeFolder, fileName),
    indexCodeStr,
    'utf-8',
  )
}

async function generateReadme(
  orderNum,
  keyStr,
  difficultyStr,
  titleStr,
  contentMd,
  tagList,
  codeFolder,
) {
  const fileName = 'README.md'
  const header = `${orderNum}-${difficultyStr}-${titleStr}`

  const descUrl = `${LEETCODE_URL}/problems/${keyStr}/description/`
  const solveUrl = `${LEETCODE_URL}/problems/${keyStr}/solutions/`
  const tagMdList = []
  tagList.forEach((tag) => {
    tagMdList.push(`- [#${tag.name}](${LEETCODE_URL}/tag/${tag.slug})`)
  })

  const contentTotalMd = `# ${header}
题目内容：[${descUrl}](${descUrl})

${contentMd}

# 标签
${tagMdList.join('\n')}

# 题解
题解：[${solveUrl}](${solveUrl})
`

  await writeFile(
    join(codeFolder, fileName),
    contentTotalMd,
    'utf-8',
  )
}

async function generateTestCases(testCasesFolder) {
  const fileName = 'cases.spec.ts'

  const contentStr = `import { expect, it } from 'vitest'
import * as runner from '../index'
import { readEnv } from '@/utils'

readEnv()

const coder = process.env.CODER as keyof typeof runner
const testFunc = runner[coder]

it('case 1', () => {
  
})

it('case 2', () => {
  
})

it('case 3', () => {
  
})
`

  await writeFile(
    join(testCasesFolder, fileName),
    contentStr,
    'utf-8',
  )
}
