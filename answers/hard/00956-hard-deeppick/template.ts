type UnionToIntersection956<U> =
  (U extends unknown ? (arg: () => U) => void : never) extends (arg: infer I) => void
    ? I
    : never

type GetUnionLast956<U> = UnionToIntersection956<U> extends () => infer I ? I : never

type UnionToTuple956<U, Last = GetUnionLast956<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last]

type Get956<T extends Record<PropertyKey, any>, K extends string> =
  K extends `${infer Cur}.${infer Rest}`
    ? { [Key in Cur]: Get956<T[Cur], Rest> }
    : K extends keyof T
      ? { [Key in K]: T[K] }
      : unknown

type DeepPick956<O extends Record<PropertyKey, any>, Keys extends string[], Res = unknown> = Keys extends [infer Cur extends string, ...infer Rest extends string[]]
  ? DeepPick956<O, Rest, Res & Get956<O, Cur>>
  : Res

type DeepPick<O extends Record<PropertyKey, any>, KeyUnion extends string> = UnionToTuple956<KeyUnion> extends infer Keys extends string[]
  ? DeepPick956<O, Keys>
  : never
