type Num476 = string | number | bigint
type ToInt476<T extends string> = T extends `${infer N extends number}` ? N : never
type IntToArr476<T extends number, Res extends unknown[] = []> = Res['length'] extends T ? Res : IntToArr476<T, [...Res, '']>

type NormalizeNum476<T extends Num476> = T extends string
  ? T
  : T extends number | bigint
    ? `${T}`
    : never

type StrToReverseArr476<S extends string, Res extends unknown[] = []> = S extends `${infer Cur}${infer Rest}`
  ? StrToReverseArr476<Rest, [ToInt476<Cur>, ...Res]>
  : Res

type Add476<A extends number, B extends number, Carry extends number = 0> = [...IntToArr476<A>, ...IntToArr476<B>, ...IntToArr476<Carry>]['length'] extends infer Sum extends number
  ? `${Sum}` extends `${infer NextCarry extends number}${infer CurSum extends number}`
    ? [NextCarry, CurSum]
    : [0, Sum]
  : never

type Sum476<A extends number[], B extends number[], Carry extends number = 0, Counter extends unknown[] = [], Res extends string =''> = Counter['length'] extends infer Index extends number
  ? A[Index] extends undefined
    ? B[Index] extends undefined
      ? Carry extends 0
        ? Res
        : `${Carry}${Res}`
      : Add476<0, B[Index], Carry> extends [infer NextCarry extends number, infer CurSum extends number]
        ? Sum476<A, B, NextCarry, [...Counter, ''], `${CurSum}${Res}`>
        : never
    : B[Index] extends undefined
      ? Add476<A[Index], 0, Carry> extends [infer NextCarry extends number, infer CurSum extends number]
        ? Sum476<A, B, NextCarry, [...Counter, ''], `${CurSum}${Res}`>
        : never
      : Add476<A[Index], B[Index], Carry> extends [infer NextCarry extends number, infer CurSum extends number]
        ? Sum476<A, B, NextCarry, [...Counter, ''], `${CurSum}${Res}`>
        : never
  : never

type Sum<A extends Num476, B extends Num476> = Sum476<StrToReverseArr476<NormalizeNum476<A>>, StrToReverseArr476<NormalizeNum476<B>>>
