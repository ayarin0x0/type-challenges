type Day28 = '2'
type Day30 = '4' | '6' | '9' | '11'
type Day31 = '1' | '3' | '5' | '7' | '8' | '10' | '12'

type NumberToArray9155<N extends string, T extends any[] = []> = `${T['length']}` extends `${N}` ? T : NumberToArray9155<N, [...T, 1]>

type GetNumber9155<S extends string> = S extends `${infer F}${infer R}` ? (F extends '0' ? R : `${F}${R}`) : `${S}`

type IsAvaildMonth9155<S extends string> = NumberToArray9155<'12'> extends [...NumberToArray9155<GetNumber9155<S>>, ...infer R] ? true : false

type GetResultDays9155<Month extends string> = GetNumber9155<Month> extends Day31
  ? '31'
  : GetNumber9155<Month> extends Day30
    ? '30'
    : GetNumber9155<Month> extends Day28
      ? '28'
      : never

type IsAvaildDay9155<Month extends string, S extends string> = S extends '00'
  ? false
  : NumberToArray9155<GetResultDays9155<Month>> extends [...NumberToArray9155<GetNumber9155<S>>, ...infer R]
    ? true
    : false

type ValidDate<S extends string> = S extends `${infer One}${infer Two}${infer Three}${infer Four}`
  ? IsAvaildMonth9155<`${One}${Two}`> extends true
    ? IsAvaildDay9155<`${One}${Two}`, `${Three}${Four}`> extends true
      ? true
      : false
    : false
  : false
