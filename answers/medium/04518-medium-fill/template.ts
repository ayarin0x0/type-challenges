type Fill4518<
  T extends unknown[],
  N,
  Start extends number,
  End extends number,
  Res extends unknown[] = [],
> =
  Res['length'] extends End
    ? Res
    : Fill4518<T, N, Start, End, [...Res, N]>

type FillWithReplace<
  T extends unknown[],
  N,
  Start extends number,
  End extends number,
  Res extends unknown[] = [],
> = T extends [infer Cur, ...infer Rest]
  ? Res['length'] extends End
    ? FillWithStay<Rest, N, End, End, [...Res, Cur]>
    : FillWithReplace<Rest, N, Start, End, [...Res, N]>
  : Res

type FillWithStay<
  T extends unknown[],
  N,
  Start extends number,
  End extends number,
  Res extends unknown[] = [],
> = T extends [infer Cur, ...infer Rest]
  ? Res['length'] extends Start
    ? FillWithReplace<T, N, Start, End, Res>
    : FillWithStay<Rest, N, Start, End, [...Res, Cur]>
  : Res

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
> = FillWithStay<T, N, Start, End, []>
