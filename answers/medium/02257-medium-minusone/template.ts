type LengthMinusOne<T extends number, Arr extends unknown[] = []> =
  0 extends 1
    ? never
    : Arr['length'] extends T
      ? Arr extends ['', ...infer Rest]
        ? Rest['length']
        : 0
      : LengthMinusOne<T, ['', ...Arr]>

type MinusOne<T extends number> = T extends 0 ? -1 : LengthMinusOne<T>
