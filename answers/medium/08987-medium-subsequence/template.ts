type IsInArray<T, Arr extends unknown[]> =
  Arr extends [infer Cur, ...infer Rest]
    ? T extends Cur
      ? true
      : IsInArray<T, Rest>
    : false

type Exclude8987<T, Target extends unknown[] = [], Res extends unknown[] = []> =
  T extends [infer Cur, ...infer Rest]
    ? IsInArray<Cur, Target> extends true
      ? Exclude8987<Rest, Target, Res>
      : Exclude8987<Rest, Target, [...Res, Cur]>
    : Res

type Subsequence8987<T extends any[]> = T extends [infer Cur, ...infer Rest]
  ? [Cur] | [Cur, ...Subsequence8987<Exclude8987<T, [Cur]>>] | Subsequence8987<Rest>
  : never

type Subsequence<T extends any[]> = [] | Subsequence8987<T>
