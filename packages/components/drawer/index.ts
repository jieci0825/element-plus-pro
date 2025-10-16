import { SFCWithInstall, withInstall } from '@coderjc/element-plus-pro-utils'
import Drawer from './src/drawer.vue'

export const ProDrawer: SFCWithInstall<typeof Drawer> = withInstall(Drawer)
export default ProDrawer

export * from './src/drawer'
