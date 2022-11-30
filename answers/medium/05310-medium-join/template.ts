type Join5310<T extends unknown[], U extends number | string, Str extends string = ''> =
  T extends [infer Cur, ...infer Rest]
    ? Cur extends string
      ? Join5310<Rest, U, `${Str}${Cur}${U}`>
      : never
    : Str extends `${infer Res}${U}`
      ? Res
      : never

type Join<T extends unknown[], U extends number | string> = Join5310<T, `${U}`, ''>
