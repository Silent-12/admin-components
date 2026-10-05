/**
 * 组件包版本常量
 *
 * 真实版本为纯整数（v1、v2…），由 `pnpm run release` 重写本文件并打同名 tag；
 * package.json 的 version 字段仅满足工具链的 semver 校验，固定为 0.0.0，
 * 供 install 时在控制台静默输出，便于下游确认升级是否生效。
 */
/** 当前组件包版本号 */
export declare const version: string;
