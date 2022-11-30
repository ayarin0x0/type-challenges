type Camelize1383<S extends string> = S extends `${infer A}_${infer B}`
  ? `${A}${Camelize1383<Capitalize<B>>}`
  : S

type Camelize<T> = T extends unknown[]
  ? T extends [infer Cur, ...infer Rest]
    ? [Camelize<Cur>, ...Camelize<Rest>]
    : []
  : T extends object
    ? {
        [Key in keyof T as Camelize1383<Key & string>]: T[Key] extends object
          ? Camelize<T[Key]>
          : T[Key]
      }
    : T
