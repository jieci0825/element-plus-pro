import { withInstall } from '@jc/element-plus-pro-utils'
import type { SFCWithInstall } from '@jc/element-plus-pro-utils'
import Form from './src/form.vue'

export const ProForm: SFCWithInstall<typeof Form> = withInstall(Form)
export default ProForm

export * from './src/form'
export * from './src/form-item.type'
