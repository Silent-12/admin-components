/**
 * 本地 SVG 资源解析
 *
 * SVG 文件属于 Admin模板项目资源（如 src/assets/svg），包内不做 import.meta.glob：
 * Admin模板在自己的构建里收集本地 SVG，并通过 install 选项注入解析函数，
 * AoSvgIcon 对不含 ":" 的图标名优先走该解析，找不到再回退 iconify。
 *
 * ## Admin模板注入示例
 *
 * ```typescript
 * const globPattern = '@/assets/svg/' + '**' + '/' + '*.svg'
 * const modules = import.meta.glob(globPattern, {
 *   eager: true, query: '?url', import: 'default'
 * }) as Record<string, string>
 *
 * app.use(AdminComponents, {
 *   resolveLocalSvg: (icon) => {
 *     const path = `${icon.split('-').join('/')}.svg`
 *     return Object.entries(modules).find(([p]) => p.endsWith(`/assets/svg/${path}`))?.[1]
 *   }
 * })
 * ```
 */

/** 本地 SVG 解析函数签名：返回资源 URL，未命中返回 undefined */
export type LocalSvgResolver = (icon: string) => string | undefined

/** 本地 SVG 解析注入 key */
export const LOCAL_SVG_KEY = Symbol('ao-admin-local-svg')

/** Admin模板 logo 图片地址注入 key */
export const LOGO_URL_KEY = Symbol('ao-admin-logo-url')
