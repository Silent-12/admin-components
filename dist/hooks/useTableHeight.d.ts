import { Ref } from 'vue';
/**
 * 表格高度计算器配置接口
 */
interface TableHeightOptions {
    /** 是否显示表格头部 */
    showTableHeader: Ref<boolean>;
    /** 表格底部栏高度（含 #footer 插槽内容与分页器） */
    bottomBarHeight: Ref<number>;
    /** 表格头部高度 */
    tableHeaderHeight: Ref<number>;
    /** 底部栏与表格之间的间距 */
    bottomBarSpacing: Ref<number>;
}
/**
 * 表格高度计算 Hook
 *
 * 提供表格容器高度的自动计算功能，支持：
 * - 表格头部高度
 * - 分页器高度
 * - 动态间距计算
 *
 * @param options 配置选项
 * @returns 容器高度计算结果
 */
export declare function useTableHeight(options: TableHeightOptions): {
    /** 容器高度样式对象 */
    containerHeight: import('vue').ComputedRef<{
        height: string;
    }>;
};
export {};
