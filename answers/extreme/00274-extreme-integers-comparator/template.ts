enum Comparison {
  Greater,
  Equal,
  Lower,
}

type IsMinus274<T extends number> = `${T}` extends `-${infer _ extends number}` ? true : false
type Abs274<T extends number> = `${T}` extends `-${infer Positive extends number}` ? Positive : T
type IntToArr274<T extends number, Res extends unknown[] = []> = Res['length'] extends T ? Res : IntToArr274<T, [...Res, '']>
type IsGreater274<A extends number, B extends number> = IntToArr274<A> extends [...IntToArr274<B>, ...infer T]
  ? T['length'] extends 0
    ? Comparison.Equal
    : Comparison.Greater
  : Comparison.Lower

// Ignore +0 -0
type Comparator<A extends number, B extends number> =
  IsMinus274<A> extends true
    ? IsMinus274<B> extends true
      // - -
      ? IsGreater274<Abs274<B>, Abs274<A>>
      // - +
      : Comparison.Lower
    : IsMinus274<B> extends true
      // + -
      ? Comparison.Greater
      // + +
      : IsGreater274<A, B>
