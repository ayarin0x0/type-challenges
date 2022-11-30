type CapitalizeObject9775<T> = T extends unknown[]
  ? T extends [infer Cur, ...infer Rest]
    ? [CapitalizeObject9775<Cur>, ...CapitalizeObject9775<Rest>]
    : []
  : T extends Record<PropertyKey, any>
    ? {
        [Key in keyof T as Capitalize<Key & string>]: CapitalizeObject9775<T[Key]>
      }
    : T

type CapitalizeNestObjectKeys<T> = CapitalizeObject9775<T>
