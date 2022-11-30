type ToArray<S extends string> =
  S extends `${infer Char}${infer Rest}`
    ? [Char, ...ToArray<Rest>]
    : []

type LengthOfString298<S extends string> = ToArray<S>['length']
