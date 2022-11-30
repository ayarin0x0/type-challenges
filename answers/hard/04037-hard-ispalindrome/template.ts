type ToString4037<T extends number | string> = `${T}`

type ToArray4037<T extends number | string> = T extends `${infer Cur}${infer Rest}`
  ? [Cur, ...ToArray4037<Rest>]
  : []

type IsSame<A extends string, B extends string> = A extends B ? true : false

type Pop4037<T extends unknown[]> = T extends [infer Cur, ...infer Rest]
  ? Rest['length'] extends 0
    ? []
    : [Cur, ...Pop4037<Rest>]
  : []

type IsAlmostEqual<A extends unknown[], B extends unknown[]> = A['length'] extends B['length']
  ? true
  : [...A, '']['length'] extends B['length']
      ? true
      : false

type IsPalindrome4037<T extends string[], Head extends string[] = [], Tail extends string[] = Pop4037<T>> =
  IsAlmostEqual<Head, Tail> extends true
    ? IsSame<T[Head['length']], T[Tail['length']]>
    : IsSame<T[Head['length']], T[Tail['length']]> extends true
      ? IsPalindrome4037<T, [...Head, ''], Pop4037<Tail>>
      : false

type IsPalindrome<T extends number | string> = IsPalindrome4037<ToArray4037<ToString4037<T>>>
