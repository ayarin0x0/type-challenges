type ToString4425<S extends number, Counter extends unknown[] = [], Str extends string = ''> =
  Counter['length'] extends S
    ? Str
    : ToString4425<S, ['', ...Counter], `1${Str}`>

type GreaterThan4425<A extends string, B extends string> =
  A extends `${B}${infer Rest}`
    ? Rest extends ''
      ? false
      : true
    : false

type GreaterThan<T extends number, U extends number> = GreaterThan4425<ToString4425<T>, ToString4425<U>>
