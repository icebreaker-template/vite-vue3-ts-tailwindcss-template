import { inject, provide } from 'vue'

export interface State {
  uid: number
  [key: string]: any
}

export const CtxSymbol = Symbol.for('ctx')

export function injectCtx() {
  return inject(CtxSymbol, {})
}

export function provideCtx(ctx: any) {
  provide(CtxSymbol, ctx)
}
