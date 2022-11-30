type Include5360<T extends unknown[], U> =
  T extends [infer F, ...infer R]
    ? Equal<F, U> extends true
      ? true
      : Include5360<R, U>
    : false

type Unique<T, Res extends unknown[] = []> =
  T extends [infer F, ...infer R]
    ? Include5360<Res, F> extends true
      ? Unique<R, Res>
      : Unique<R, [...Res, F]>
    : Res
