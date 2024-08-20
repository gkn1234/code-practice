# code-practice
leetcode code practice

# 使用说明

1. 执行 `pnpm i` 安装依赖。

2. 执行 `pnpm run leetcode <题目编号>` 可一键生成刷题目录。

3. 在根目录下创建文件 `.env.local`，设置 `CODER` 环境变量为自己的名称。

4. 找到自己名称对应的 `ts` 文件(与上一步设置的 `CODER` 环境变量对应)，实现函数。

5. `__tests__` 目录下的 `cases.spec.ts` 可以写测试用例。

6. 使用 `Vitest` 插件执行用例，初步调通后，可尝试将结果复制到 `leetcode` 进行提交。
