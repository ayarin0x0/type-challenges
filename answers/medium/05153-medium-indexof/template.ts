type Equal5153<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type IndexOf5153<T extends unknown[], U, Counter extends unknown[] = []> = T extends [infer Cur, ...infer Rest]
  ? Equal5153<Cur, U> extends true
    ? Counter['length']
    : IndexOf5153<Rest, U, ['', ...Counter]>
  : -1

type IndexOf<T extends unknown[], U> = IndexOf5153<T, U>
