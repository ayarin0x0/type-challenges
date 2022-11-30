type Minus216<A extends number, B extends number, DefaultValue = A> = IntToAnyArr216<A> extends [...IntToAnyArr216<B>, ...infer T]
  ? T['length']
  : DefaultValue

type IsAGreaterB216<A extends number, B extends number, ContainEqual = true> = IntToAnyArr216<A> extends [...IntToAnyArr216<B>, ...infer T]
  ? T['length'] extends 0
    ? ContainEqual
    : true
  : false

type IntToAnyArr216<T extends number, Pad = any, Res extends unknown[] = []> = Res['length'] extends T
  ? Res
  : IntToAnyArr216<T, Pad, [...Res, Pad]>

type IsNegative216<Num extends number> = `${Num}` extends `-${infer _ extends number}`
  ? true
  : false

type ToPositive216<Num extends number> = `${Num}` extends `-${infer T extends number}`
  ? T
  : Num

type GetBefore216<_Arr extends unknown[], Start extends number> = Start
type GetAfter216<Arr extends unknown[], End extends number> = Minus216<Arr['length'], End>

type NormalizeStart216<Arr extends unknown[], Start extends number> = IsNegative216<Start> extends true
  ? ToPositive216<Start> extends infer PStart extends number
    ? IsAGreaterB216<ToPositive216<Start>, Arr['length']> extends true
      ? Arr['length']
      : Minus216<Arr['length'], PStart>
    : never
  : IsAGreaterB216<Start, Arr['length']> extends true
    ? Arr['length']
    : Start

type NormalizeEnd216<Arr extends unknown[], End extends number> = IsNegative216<End> extends true
  ? ToPositive216<End> extends infer PEnd extends number
    ? IsAGreaterB216<ToPositive216<End>, Arr['length']> extends true
      ? Arr['length']
      : Minus216<Arr['length'], PEnd>
    : never
  : IsAGreaterB216<End, Arr['length']> extends true
    ? Arr['length']
    : End

type Slice216<Arr, Before extends number, After extends number> = Arr extends [...IntToAnyArr216<Before>, ...infer R, ...IntToAnyArr216<After>]
  ? R
  : Arr

type Slice<Arr extends unknown[], Start extends number = 0, End extends number = Arr['length']> =
  NormalizeStart216<Arr, Start> extends infer NStart extends number
    ? NormalizeEnd216<Arr, End> extends infer NEnd extends number
      ? IsAGreaterB216<NStart, NEnd, false> extends true
        ? []
        : Slice216<Arr, GetBefore216<Arr, NStart>, GetAfter216<Arr, NEnd>>
      : never
    : never
