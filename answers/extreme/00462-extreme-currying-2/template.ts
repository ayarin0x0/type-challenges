type CurringResult462<Args, R> = <CurArgs extends unknown[]>(...args: CurArgs) => Args extends [...CurArgs, ...infer RestArgs extends unknown[]]
  ? RestArgs['length'] extends 0
    ? R
    : CurringResult462<RestArgs, R>
  : never

type Currying462<T extends (...args: any) => any> = T extends (...args: infer Args) => ReturnType<T>
  ? CurringResult462<Args, ReturnType<T>>
  : never

declare function DynamicParamsCurrying<T extends (...args: any) => any>(fn: T): Currying462<T>
