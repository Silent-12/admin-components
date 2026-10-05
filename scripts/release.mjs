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
  ? tagOutput.split('\n').map((t) => parseInt(t.replace(/^v/, ''), 10)).filter(Number.isFinite)
  : []
const next = (versions.length ? Math.max(...versions) : 0) + 1

// 2. 写入 package.json version 与 CHANGELOG
const pkgPath = 'package.json'
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
pkg.version = String(next)
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

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
