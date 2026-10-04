/**
 * 权限列表注入 key
 */
export declare const AUTH_LIST_KEY: unique symbol;
/** 权限列表获取函数签名 */
export type AuthListGetter = () => string[] | undefined;
/**
 * @description 提供当前登录用户的操作权限判断能力（权限来源由宿主注入）。
 * @return 包含权限判断方法的对象。
 */
export declare const useAuth: () => {
    hasAuth: (auth: string) => boolean;
};
