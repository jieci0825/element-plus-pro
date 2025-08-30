import type { ComponentSize, TableColumnInstance } from 'element-plus'
import type {
    ComponentOrUndefined,
    HeaderConfig,
    StringOrUndefined
} from './common.type'

type OperationColumnConfigBtnOption = {
    size?: ComponentSize
    // 是否以文本按钮的样式展示
    isTextBtn?: boolean
    // 是否需要icon
    isNeedIcon?: boolean
    // 按钮展示模式：icon-text:图标+文本；icon-only:图标；text-only:文本
    displayMode?: 'icon-text' | 'icon-only' | 'text-only'
    // 是否隐藏按钮-数组形式，分别对应查看、编辑、删除
    hideBtns?: [boolean, boolean, boolean]
    disabledBtns?: [boolean, boolean, boolean]
    cancelDefault?: [boolean, boolean, boolean]
    btnTexts?: [StringOrUndefined, StringOrUndefined, StringOrUndefined]
    btnIcons?: [
        StringOrUndefined | ComponentOrUndefined,
        StringOrUndefined | ComponentOrUndefined,
        StringOrUndefined | ComponentOrUndefined
    ]
    editClick?: (row: any) => void
    viewClick?: (row: any) => void
    deleteClick?: (row: any) => void
    // 当你不想给每一个按钮都单独配置点击事件，希望统一配置点击事件时，可以传递这个，当存在单独click事件配置时，优先使用单独的
    handleClick?: (row: any, btnType: 'edit' | 'view' | 'delete') => void
}
// 操作列配置
//  - 所有的元组传递，如果只想改变其中一个，其他的想使用默认的可以传递 undefined
export interface OperationColumnConfig
    extends Partial<Pick<TableColumnInstance, 'width' | 'minWidth' | 'align'>> {
    fixed?: 'left' | 'right' | null
    label?: HeaderConfig
    btnProps?: OperationColumnConfigBtnOption
}
