type ReverseArgs3196<T extends unknown[]> =
  T extends [infer Cur, ... infer Rest]
    ? [...ReverseArgs3196<Rest>, Cur]
    : []

type FlipArguments<T extends Function> =
  T extends (...args: infer Args) => infer Ret
    ? (...args: ReverseArgs3196<Args>) => Ret
    : never
