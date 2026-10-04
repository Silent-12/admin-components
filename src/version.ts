/**
 * 组件包版本常量
 *
 * __VERSION__ 由 vite define 在构建期从 package.json 的 version 注入，
 * 供 install 时在控制台静默输出，便于下游确认升级是否生效。
 */
declare const __VERSION__: string

/** 当前组件包版本号 */
export const version: string = __VERSION__
