type Pow6141<T extends string | number, Counter extends unknown[] = [], Res extends unknown[] = ['']> =
  `${Counter['length']}` extends `${T}`
    ? Res
    : Pow6141<T, [...Counter, ''], [...Res, ...Res]>

type ToArrAndReverse<S extends string, Res extends unknown[] = []> = S extends `${infer Cur}${infer Rest}`
  ? ToArrAndReverse<Rest, [Cur, ...Res]>
  : Res

type BinaryToDecimal6141<S extends string[], Digit extends unknown[] = [], Res extends unknown[] = []> = S extends [infer Cur extends string, ...infer Rest extends string[]]
  ? BinaryToDecimal6141<
    Rest,
    [...Digit, ''],
    Cur extends '0'
      ? Res
      : Cur extends '1'
        ? [...Res, ...Pow6141<Digit['length']>]
        : never
  >
  : Res['length']

type BinaryToDecimal<S extends string> = BinaryToDecimal6141<ToArrAndReverse<S>>
