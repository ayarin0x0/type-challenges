type Combination<T extends string[], A = T[number], U = A> =
  U extends infer I extends string
    ? I | `${I} ${Combination<[], Exclude<A, I>>}`
    : never
