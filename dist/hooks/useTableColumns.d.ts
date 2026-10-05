import { ComputedRef, Ref } from 'vue';
import { ColumnOption } from '../types/component';
/**
 * @description 获取列的唯一标识，优先使用原生 columnKey，允许展示列省略 prop 或多列共用数据字段
 * @param col 列配置
 * @return 列的唯一标识
 */
export declare const getColumnKey: <T extends Record<string, any>>(col: ColumnOption<T>) => string;
/**
 * @description 获取列的显示状态，visible 优先于 checked，两者都未声明时视为显示
 * @param col 列配置
 * @return 是否显示该列
 */
export declare const getColumnVisibility: <T extends Record<string, any>>(col: ColumnOption<T>) => boolean;
/**
 * 动态列配置接口
 * @description useTableColumns 返回的列增删改查能力
 */
export interface DynamicColumnConfig<T extends Record<string, any> = any> {
    /**
     * 新增列（支持单个或批量）
     * @param column 列配置或列配置数组
     * @param index 可选的插入位置，默认末尾（批量时为第一个列的位置）
     */
    addColumn: (column: ColumnOption<T> | ColumnOption<T>[], index?: number) => void;
    /**
     * 删除列（支持单个或批量）
     * @param prop 列的唯一标识或标识数组
     */
    removeColumn: (prop: string | string[]) => void;
    /**
     * 切换列显示状态（支持单个或批量）
     * @param prop 列的唯一标识或标识数组
     * @param visible 可选的显示状态，默认取反
     */
    toggleColumn: (prop: string | string[], visible?: boolean) => void;
    /**
     * 更新列（支持单个或批量）
     * @param prop 列的唯一标识或更新配置数组
     * @param updates 列配置更新（当 prop 为字符串时使用）
     */
    updateColumn: (prop: string | Array<{
        prop: string;
        updates: Partial<ColumnOption<T>>;
    }>, updates?: Partial<ColumnOption<T>>) => void;
    /**
     * 批量更新列（兼容旧版本，推荐使用 updateColumn 的数组模式）
     * @deprecated 推荐使用 updateColumn 的数组模式
     */
    batchUpdateColumns: (updates: Array<{
        prop: string;
        updates: Partial<ColumnOption<T>>;
    }>) => void;
    /**
     * 重新排序列
     * @param fromIndex 源索引
     * @param toIndex 目标索引
     */
    reorderColumns: (fromIndex: number, toIndex: number) => void;
    /**
     * 获取列配置
     * @param prop 列的唯一标识
     * @return 列配置
     */
    getColumnConfig: (prop: string) => ColumnOption<T> | undefined;
    /**
     * 获取所有列配置
     * @return 所有列配置
     */
    getAllColumns: () => ColumnOption<T>[];
    /**
     * 重置所有列到初始配置
     */
    resetColumns: () => void;
}
/**
 * @description 创建表格列配置管理实例，供 AoTable 的 columns 与 v-model:column-checks 使用
 * @param columnsFactory 初始列配置工厂，重置列时重新调用
 * @return 当前显示列、列设置数据源与列增删改查方法
 */
export declare function useTableColumns<T extends Record<string, any> = any>(columnsFactory: () => ColumnOption<T>[]): {
    columns: ComputedRef<ColumnOption<T>[]>;
    columnChecks: Ref<ColumnOption<T>[]>;
} & DynamicColumnConfig<T>;
