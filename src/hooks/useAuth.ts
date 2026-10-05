/**
 * useAuth - 权限验证管理
 *
 * 与模板内使用 user store 的版本不同，包内不感知业务用户数据：
 * 权限列表通过 `app.use(AdminComponents, { getAuthList })` 注入，
 * 未注入时视为无权限（按钮级权限控制不生效，由 Admin模板自行控制渲染）。
 *
 * ## Admin模板注入示例
 *
 * ```typescript
 * app.use(AdminComponents, {
 *   getAuthList: () => useUserStore().info?.auth
 * })
 * ```
 */
import { inject } from 'vue'

/**
 * 权限列表注入 key
 */
export const AUTH_LIST_KEY = Symbol('ao-admin-auth-list')

/** 权限列表获取函数签名 */
export type AuthListGetter = () => string[] | undefined

/**
 * @description 提供当前登录用户的操作权限判断能力（权限来源由 Admin模板注入）。
 * @return 包含权限判断方法的对象。
 */
export const useAuth = () => {
  const getAuthList = inject<AuthListGetter>(AUTH_LIST_KEY, () => undefined)

  /**
   * @description 判断当前用户是否拥有指定操作权限。
   * @param auth 权限标识。
   * @return 是否拥有该权限。
   */
  const hasAuth = (auth: string): boolean => {
    if (!auth) return false
    return getAuthList()?.includes(auth) ?? false
  }

  return { hasAuth }
}
