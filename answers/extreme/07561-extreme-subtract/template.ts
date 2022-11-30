type ToReverseArr<T extends number | string, Res extends number[] = []> = `${T}` extends `${infer Cur extends number}${infer Rest}`
  ? ToReverseArr<Rest, [Cur, ...Res]>
  : Res

type ToCounter<T extends number, Res extends unknown[] = []> = Res['length'] extends T
  ? Res
  : ToCounter<T, [...Res, '']>

/**
 * OneOnOneSubtract7561<3, 5> = [2, 1]
 * OneOnOneSubtract7561<5, 3> = [2, 0]
 * OneOnOneSubtract7561<9, 1> = [8, 0]
 * OneOnOneSubtract7561<1, 9> = [8, 1]
 */
type OneOnOneSubtract7561<M extends number, S extends number, Carry extends number = 0> = ToCounter<M> extends [...ToCounter<S>, ...ToCounter<Carry>, ...infer Diff]
  ? [Diff['length'], 0]
  : [...ToCounter<M>, ...ToCounter<10>] extends [...ToCounter<S>, ...ToCounter<Carry>, ...infer Diff]
      ? [Diff['length'], 1]
      : never

type ResolveRes<T extends string> = T extends `${infer Cur}${infer Rest}`
  ? Cur extends '0'
    ? ResolveRes<Rest>
    : T extends `${infer N extends number}`
      ? N
      : never
  : 0

type Subtract7561<
  M extends number[],
  S extends number[],
  Carry extends number = 0,
  Counter extends unknown[] = [],
  Res extends string = '',
  Index extends number = Counter['length'],
> = M[Index] extends number
  ? S[Index] extends number
    ? OneOnOneSubtract7561<M[Index], S[Index], Carry> extends [infer CurValue extends number, infer NextCarry extends number]
      ? Subtract7561<M, S, NextCarry, [...Counter, ''], `${CurValue}${Res}`>
      : never
    : OneOnOneSubtract7561<M[Index], 0, Carry> extends [infer CurValue extends number, infer NextCarry extends number]
      ? Subtract7561<M, S, NextCarry, [...Counter, ''], `${CurValue}${Res}`>
      : never
  : S[Index] extends number
    ? never // Negative
    : Carry extends 0
      ? ResolveRes<Res>
      : never // Negative

// M => minuend, S => subtrahend
type Subtract<M extends number, S extends number> = Subtract7561<ToReverseArr<M>, ToReverseArr<S>>
