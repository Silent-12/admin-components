/**
 * 页面滚动工具
 *
 * 包内独立实现，替代模板 useCommon 中 AoTable 用到的 scrollToTop，
 * 避免对 menu/setting store 的依赖。滚动容器依赖布局的 #app-main 锚点。
 */
/**
 * @description 将布局内容区滚动回顶部（依赖 #app-main 锚点，无则退化为窗口滚动）。
 */
export declare const scrollToTop: () => void;
