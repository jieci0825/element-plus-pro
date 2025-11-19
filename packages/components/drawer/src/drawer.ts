import type { DrawerProps } from 'element-plus'

export type ProDrawerProps = DrawerProps

export const proDrawerEmits = {
    'update:visible': (value: boolean) => true
}
export type ProDrawerEmits = typeof proDrawerEmits
