import type { InjectionKey } from 'vue'
import type { ProTableContext } from './table'

export const tableContextKey: InjectionKey<ProTableContext> =
    Symbol('tableContextKey')
