type Fibonacci4182<Counter extends unknown[] = []> =
  0 extends 1
    ? never
    : Counter['length'] extends 0
      ? []
      : Counter['length'] extends 1
        ? ['']
        : Counter extends [infer _, ...infer Minus1]
          ? [...Fibonacci4182<Minus1>, ...Fibonacci4182<Minus1 extends [infer _, ...infer Minus2] ? Minus2 : []>]
          : never

type NumToCounter<T extends number, Arr extends unknown[] = []> =
  0 extends 1
    ? never
    : Arr['length'] extends T
      ? Arr
      : NumToCounter<T, ['', ...Arr]>

type Fibonacci<T extends number> = Fibonacci4182<NumToCounter<T>>['length']
