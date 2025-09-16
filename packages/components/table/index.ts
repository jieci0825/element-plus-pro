import { withInstall } from '@jc/element-plus-pro-utils'
import type { SFCWithInstall } from '@jc/element-plus-pro-utils'
import Table from './src/table.vue'

export const ProTable: SFCWithInstall<typeof Table> = withInstall(Table)
export default ProTable

export * from './src/table'
export * from './src/operation-column/operation-column.type'
export * from './src/common.type'
export * from './src/table-cell.type'
