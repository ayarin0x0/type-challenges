// https://github.com/type-challenges/type-challenges/issues/11688

type Sort<A extends number[], D extends boolean = false>
  = A extends [infer A0 extends number, infer A1 extends number, ...infer AR extends number[]]
    ? Split741<[A1, ...AR], A0> extends [infer Lower extends number[], infer Higher extends number[]]
      ? D extends true
        ? [...Sort<Higher, D>, A0, ...Sort<Lower, D>]
        : [...Sort<Lower, D>, A0, ...Sort<Higher, D>]
      : never
    : A

// <[5, 1, 4, 2, 3], 3> -> [[1, 2], [5, 4, 3]]; <[1, 2, 3], 4> -> [[1, 2, 3], []]
type Split741<A extends number[], M extends number, Lower extends number[] = [], Higher extends number[] = []>
  = A extends [infer H extends number, ...infer T extends number[]]
    ? IsLower<H, M> extends true
      ? Split741<T, M, [...Lower, H], Higher>
      : Split741<T, M, Lower, [...Higher, H]>
    : [Lower, Higher]

// <2, 4> -> true; <4, 2> -> false; <2, 2> -> false
type IsLower<A extends number, B extends number>
  = '0123456789' extends `${string}${A}${string}${B}${string}` ? true : false
