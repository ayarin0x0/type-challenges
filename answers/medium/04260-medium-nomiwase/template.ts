type ToUnion4260<S extends string> =
  S extends `${infer Cur}${infer Rest}`
    ? Cur | ToUnion4260<Rest>
    : ''

type Combination4260<S extends string, Copy = S> =
  Copy extends S
    ? Copy | `${Copy}${Combination4260<Exclude<S, Copy>>}`
    : never

type AllCombinations<S extends string> = Combination4260<ToUnion4260<S>>
