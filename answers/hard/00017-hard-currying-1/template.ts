type Currying17<Args, Res> =
  Args extends [infer Cur, ...infer Rest]
    ? (arg: Cur) => Currying17<Rest, Res>
    : Res

declare function Currying<T>(
  fn: T
): T extends (...args: infer Args) => infer Res
  ? Args['length'] extends 0
    ? T
    : Currying17<Args, Res>
  : never
