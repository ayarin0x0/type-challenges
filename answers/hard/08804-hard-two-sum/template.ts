type ToUnion8804<T extends number[]> = T[number]

type GenArr8804<Len extends number, Res extends unknown[] = []> = Res['length'] extends Len
  ? Res
  : GenArr8804<Len, [...Res, '']>

type Sum8804<A extends number = 0, B extends number = 0> = [...GenArr8804<A>, ...GenArr8804<B>]['length']

type Combination8804<Base extends number, T extends number[]> = T extends [infer Cur extends number, ...infer Rest extends number[]]
  ? Sum8804<Base, Cur> | Combination8804<Base, Rest>
  : never

type AllCombinations8804<T extends number[]> = T['length'] extends 0 | 1
  ? never
  : T extends [infer Cur extends number, ...infer Rest extends number[]]
    ? Combination8804<Cur, Rest> | AllCombinations8804<Rest>
    : never

type TwoSum<T extends number[], U extends number> = U extends AllCombinations8804<T> ? true : false
