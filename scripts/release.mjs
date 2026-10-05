/**
 * 自动发版脚本
 *
 * 版本号为纯整数自增（v1、v2、v3…），不使用 semver 小数点版本：
 * 1. 读取已有 v* tag 的最大整数版本，无 tag 从 1 开始，next = max + 1
 * 2. 重写 src/version.ts 的版本号并追加 CHANGELOG
 * 3. 执行构建，将 dist 提交进仓库（下游 git 依赖安装时无需构建环境）
 * 4. 提交、打 tag、推送
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' })
}

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf-8' }).trim()
}

// 1. 计算下一个整数版本
const tagOutput = sh('git tag --list "v*"')
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
let changelog = existsSync(changelogPath) ? readFileSync(changelogPath, 'utf-8') : '# Changelog\n\n'
if (!changelog.endsWith('\n')) changelog += '\n'
changelog += `## v${next} (${today})\n\n- 见提交记录\n`
writeFileSync(changelogPath, changelog)

// 3. 构建
run('pnpm run build')

// 4. 提交、打 tag、推送
run('git add src/version.ts CHANGELOG.md dist')
run(`git commit -m "release: v${next}"`)
run(`git tag v${next}`)
run('git push origin HEAD --tags')

console.info(`[release] 完成：v${next}`)
