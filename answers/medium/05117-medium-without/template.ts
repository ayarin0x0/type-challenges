type ToUnion5117<U extends unknown[]> =
  U extends [infer Cur, ...infer Rest]
    ? Cur extends number ? Cur | ToUnion5117<Rest> : ''
    : never

type Set5117<U extends unknown[]> = {
  [Key in ToUnion5117<U>]: true
}

type Without5117<T extends unknown[], Set extends Record<number, true>, Res extends number[] = []> =
  T extends [infer Cur, ...infer Rest]
    ? Cur extends number
      ? Set[Cur] extends true
        ? Without5117<Rest, Set, Res>
        : Without5117<Rest, Set, [...Res, Cur]>
      : never
    : Res

type Without<T extends unknown[], U> = U extends unknown[]
  ? Without5117<T, Set5117<U>>
  : Without5117<T, Set5117<[U]>>
