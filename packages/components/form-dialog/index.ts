import { SFCWithInstall, withInstall } from '@coderjc/element-plus-pro-utils'
import FormDialog from './src/form-dialog.vue'

export const ProFormDialog: SFCWithInstall<typeof FormDialog> =
    withInstall(FormDialog)
export default ProFormDialog

export * from './src/form-dialog'
