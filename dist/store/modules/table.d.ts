import { TableSizeEnum } from '../../enums';
export declare const useTableStore: import('pinia').StoreDefinition<"tableStore", Pick<{
    tableSize: import('vue').Ref<TableSizeEnum, TableSizeEnum>;
    isZebra: import('vue').Ref<boolean, boolean>;
    isBorder: import('vue').Ref<boolean, boolean>;
    isHeaderBackground: import('vue').Ref<boolean, boolean>;
    setTableSize: (size: TableSizeEnum) => TableSizeEnum;
    setIsZebra: (value: boolean) => boolean;
    setIsBorder: (value: boolean) => boolean;
    setIsHeaderBackground: (value: boolean) => boolean;
    isFullScreen: import('vue').Ref<boolean, boolean>;
    setIsFullScreen: (value: boolean) => boolean;
}, "tableSize" | "isZebra" | "isBorder" | "isHeaderBackground" | "isFullScreen">, Pick<{
    tableSize: import('vue').Ref<TableSizeEnum, TableSizeEnum>;
    isZebra: import('vue').Ref<boolean, boolean>;
    isBorder: import('vue').Ref<boolean, boolean>;
    isHeaderBackground: import('vue').Ref<boolean, boolean>;
    setTableSize: (size: TableSizeEnum) => TableSizeEnum;
    setIsZebra: (value: boolean) => boolean;
    setIsBorder: (value: boolean) => boolean;
    setIsHeaderBackground: (value: boolean) => boolean;
    isFullScreen: import('vue').Ref<boolean, boolean>;
    setIsFullScreen: (value: boolean) => boolean;
}, never>, Pick<{
    tableSize: import('vue').Ref<TableSizeEnum, TableSizeEnum>;
    isZebra: import('vue').Ref<boolean, boolean>;
    isBorder: import('vue').Ref<boolean, boolean>;
    isHeaderBackground: import('vue').Ref<boolean, boolean>;
    setTableSize: (size: TableSizeEnum) => TableSizeEnum;
    setIsZebra: (value: boolean) => boolean;
    setIsBorder: (value: boolean) => boolean;
    setIsHeaderBackground: (value: boolean) => boolean;
    isFullScreen: import('vue').Ref<boolean, boolean>;
    setIsFullScreen: (value: boolean) => boolean;
}, "setTableSize" | "setIsZebra" | "setIsBorder" | "setIsHeaderBackground" | "setIsFullScreen">>;
