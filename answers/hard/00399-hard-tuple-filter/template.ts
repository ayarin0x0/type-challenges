type FilterOut<T extends any[], F, Res extends unknown[] = []> =
  T extends [infer Cur, ...infer Rest]
    ? [Cur] extends [F]
        ? FilterOut<Rest, F, Res>
        : FilterOut<Rest, F, [...Res, Cur]>
    : Res
