/**
 * 自动发版脚本
 *
 * 版本号为纯整数自增（v1、v2、v3…），不使用 semver 小数点版本：
 * 1. 读取已有 v* tag 的最大整数版本，无 tag 从 1 开始，next = max + 1
 * 2. 重写 src/version.ts 的版本号并追加 CHANGELOG（存在「未发布」小节时提升为当前版本小节）
 * 3. 执行构建，将 dist 提交进仓库（下游 git 依赖安装时无需构建环境）
 * 4. 提交、打 tag、推送
 */
import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

/**
 * @description 执行命令并透传标准输出，退出码非 0 时抛出异常终止发版
 * @param cmd 待执行的命令
 */
function run(cmd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, { stdio: 'inherit', shell: true })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`命令执行失败（退出码 ${code}）：${cmd}`))
    })
  })
}

/**
 * @description 执行命令并返回去除首尾空白的标准输出，退出码非 0 时抛出异常
 * @param cmd 待执行的命令
 * @return 命令的标准输出
 */
function sh(cmd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, { stdio: ['ignore', 'pipe', 'inherit'], shell: true })
    let output = ''
    child.stdout.on('data', (chunk) => (output += chunk))
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve(output.trim())
      else reject(new Error(`命令执行失败（退出码 ${code}）：${cmd}`))
    })
  })
}

// 1. 计算下一个整数版本
const tagOutput = await sh('git tag --list "v*"')
const versions = tagOutput
  ? tagOutput
      .split('\n')
      .map((t) => parseInt(t.replace(/^v/, ''), 10))
      .filter(Number.isFinite)
  : []
const next = (versions.length ? Math.max(...versions) : 0) + 1

// 2. 重写 src/version.ts 并追加 CHANGELOG
writeFileSync(
  'src/version.ts',
  `/**
 * 组件包版本常量
 *
 * 真实版本为纯整数（v1、v2…），由 \`pnpm run release\` 重写本文件并打同名 tag；
 * package.json 的 version 字段仅满足工具链的 semver 校验，固定为 0.0.0，
 * 供 install 时在控制台静默输出，便于下游确认升级是否生效。
 */

/** 当前组件包版本号 */
export const version: string = '${next}'
`
)

const changelogPath = 'CHANGELOG.md'
const today = new Date().toISOString().slice(0, 10)
const versionHeading = `## v${next} (${today})`
let changelog = existsSync(changelogPath) ? readFileSync(changelogPath, 'utf-8') : '# Changelog\n\n'
if (!changelog.endsWith('\n')) changelog += '\n'
// 已整理的「未发布」小节直接提升为当前版本小节，避免发布后残留未发布标题；否则追加占位条目
if (changelog.includes('## 未发布')) {
  changelog = changelog.replace('## 未发布', versionHeading)
} else {
  changelog += `${versionHeading}\n\n- 见提交记录\n`
}
writeFileSync(changelogPath, changelog)

// 3. 构建
await run('pnpm run build')

// 4. 提交、打 tag、推送
await run('git add src/version.ts CHANGELOG.md dist')
await run(`git commit -m "release: v${next}"`)
await run(`git tag v${next}`)
await run('git push origin HEAD --tags')

console.info(`[release] 完成：v${next}`)
