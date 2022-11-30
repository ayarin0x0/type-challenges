type Shift<T extends unknown[]> =
  T['length'] extends 0
    ? []
    : T extends [infer _First, ...infer Rest] ? Rest : never
