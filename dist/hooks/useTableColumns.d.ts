import { ComputedRef, Ref } from 'vue';
import { ColumnOption } from '../types/component';
/**
 * @description 获取列的唯一标识，优先使用原生 columnKey，允许展示列省略 prop 或多列共用数据字段；
 * 无 columnKey 的特殊列回落到类型占位标识，省略 prop 的展示列回退到 slotName；
 * 同类型的特殊列出现多个时必须显式声明 columnKey
 * @param col 列配置
 * @return 列的唯一标识
 */
export declare const getColumnKey: <T extends Record<string, any>>(col: ColumnOption<T>) => string;
/**
 * @description 获取列的显示状态，visible 未声明时视为显示
 * @param col 列配置
 * @return 是否显示该列
 */
export declare const getColumnVisibility: <T extends Record<string, any>>(col: ColumnOption<T>) => boolean;
/**
 * 动态列配置接口
 * @description useTableColumns 返回的列增删改查能力
 */
export interface DynamicColumnConfig<T extends Record<string, any> = any> {
    addColumn: (column: ColumnOption<T> | ColumnOption<T>[], index?: number) => void;
    removeColumn: (prop: string | string[]) => void;
    toggleColumn: (prop: string | string[], visible?: boolean) => void;
    updateColumn: (prop: string | Array<{
        prop: string;
        updates: Partial<ColumnOption<T>>;
    }>, updates?: Partial<ColumnOption<T>>) => void;
    batchUpdateColumns: (updates: Array<{
        prop: string;
        updates: Partial<ColumnOption<T>>;
    }>) => void;
    reorderColumns: (fromIndex: number, toIndex: number) => void;
    getColumnConfig: (prop: string) => ColumnOption<T> | undefined;
    getAllColumns: () => ColumnOption<T>[];
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
