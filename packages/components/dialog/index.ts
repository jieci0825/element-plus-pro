import { SFCWithInstall, withInstall } from '@coderjc/element-plus-pro-utils'
import Dialog from './src/dialog.vue'

export const ProDialog: SFCWithInstall<typeof Dialog> = withInstall(Dialog)
export default ProDialog

export * from './src/dialog'
