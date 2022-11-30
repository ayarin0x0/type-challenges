type Reverse3192<T> =
  T extends [infer Cur, ...infer Rest]
    ? [...Reverse3192<Rest>, Cur]
    : T

type Reverse<T> = T extends [] ? T : Reverse3192<T>
