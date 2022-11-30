type UnionToIntersection730<U> =
  (U extends unknown ? (arg: () => U) => void : never) extends (arg: infer I) => void
    ? I
    : never

type GetUnionLast730<U> = UnionToIntersection730<U> extends () => infer I ? I : never

type UnionToTuple<U, Last = GetUnionLast730<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last]
