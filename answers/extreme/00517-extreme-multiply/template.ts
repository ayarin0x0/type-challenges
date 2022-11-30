type Num517 = string | number | bigint

type IsZero<T extends string> = T extends `${infer Cur}${infer Rest}`
  ? Cur extends '0'
    ? IsZero<Rest>
    : false
  : true

type ToInt517<T extends Num517> = T extends string
  ? T extends `${infer N extends number}`
    ? N
    : never
  : T

type IntToArr517<T extends number, Res extends unknown[] = []> = Res['length'] extends T ? Res : IntToArr517<T, [...Res, '']>

type NormalizeNum517<T extends Num517> = T extends string
  ? T
  : T extends number | bigint
    ? `${T}`
    : never

type StrToReverseArr517<S extends string, Res extends unknown[] = []> = S extends `${infer Cur}${infer Rest}`
  ? StrToReverseArr517<Rest, [ToInt517<Cur>, ...Res]>
  : Res

type Add517<A extends number, B extends number, Carry extends number = 0> = [...IntToArr517<A>, ...IntToArr517<B>, ...IntToArr517<Carry>]['length'] extends infer Sum extends number
  ? `${Sum}` extends `${infer NextCarry extends number}${infer CurSum extends number}`
    ? [NextCarry, CurSum]
    : [0, Sum]
  : never

type SumHelper517<A extends number[], B extends number[], Carry extends number = 0, Counter extends unknown[] = [], Res extends string =''> = Counter['length'] extends infer Index extends number
  ? A[Index] extends undefined
    ? B[Index] extends undefined
      ? Carry extends 0
        ? Res
        : `${Carry}${Res}`
      : Add517<0, B[Index], Carry> extends [infer NextCarry extends number, infer CurSum extends number]
        ? SumHelper517<A, B, NextCarry, [...Counter, ''], `${CurSum}${Res}`>
        : never
    : B[Index] extends undefined
      ? Add517<A[Index], 0, Carry> extends [infer NextCarry extends number, infer CurSum extends number]
        ? SumHelper517<A, B, NextCarry, [...Counter, ''], `${CurSum}${Res}`>
        : never
      : Add517<A[Index], B[Index], Carry> extends [infer NextCarry extends number, infer CurSum extends number]
        ? SumHelper517<A, B, NextCarry, [...Counter, ''], `${CurSum}${Res}`>
        : never
  : never

type Sum517<A extends Num517, B extends Num517> = SumHelper517<StrToReverseArr517<NormalizeNum517<A>>, StrToReverseArr517<NormalizeNum517<B>>>

type SplitCarry517<T extends Num517> = NormalizeNum517<T> extends `${infer Carry extends number}${infer Sum extends number}`
  ? [Carry, Sum]
  : [0, ToInt517<T>]

type OneOnOneMultiply517<Base extends number, Times extends number, Counter extends unknown[] = [], Res extends unknown[] = []> =
  Counter['length'] extends Times
    ? Res['length']
    : OneOnOneMultiply517<Base, Times, [...Counter, ''], [...Res, ...IntToArr517<Base>]>

type MultipleOnOneMultiply516<Base extends number[], Times extends number, Carry extends number = 0, Res extends string = ''> =
  Base extends [infer Cur extends number, ...infer Rest extends number[]]
    ? SplitCarry517<Sum517<Carry, OneOnOneMultiply517<Cur, Times> & number>> extends [infer NextCarry extends number, infer Sum extends number]
      ? MultipleOnOneMultiply516<Rest, Times, NextCarry, `${Sum}${Res}`>
      : never
    : Carry extends 0
      ? Res
      : `${Carry}${Res}`

type MultiplyHelper517<Base extends number[], T extends number[], Suffix extends string = '', Res extends string[] = []> = T extends [infer Cur extends number, ...infer Rest extends number[]]
  ? MultiplyHelper517<Base, Rest, `${Suffix}0`, [...Res, `${MultipleOnOneMultiply516<Base, Cur>}${Suffix}`]>
  : SumMultiplyResult517<Res>

type SumMultiplyResult517<Res extends string[], Sum extends string = '0'> = Res extends [infer Cur extends string, ...infer Rest extends string[]]
  ? SumMultiplyResult517<Rest, Sum517<Sum, Cur>>
  : IsZero<Sum> extends true
    ? '0'
    : Sum

type Multiply<A extends Num517, B extends Num517> = MultiplyHelper517<StrToReverseArr517<NormalizeNum517<A>>, StrToReverseArr517<NormalizeNum517<B>>>
