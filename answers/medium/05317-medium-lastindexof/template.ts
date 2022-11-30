type Equal5317<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type LastIndexOf5317<T extends unknown[], U, Counter extends unknown[] = [], IndexLogger extends number[] = []> = T extends [infer Cur, ...infer Rest]
  ? Equal5317<Cur, U> extends true
    ? LastIndexOf5317<Rest, U, ['', ...Counter], [Counter['length'], ...IndexLogger]>
    : LastIndexOf5317<Rest, U, ['', ...Counter], IndexLogger>
  : [...IndexLogger, -1]

type LastIndexOf<T extends unknown[], U> = LastIndexOf5317<T, U>[0]
