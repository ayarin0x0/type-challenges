type Merge9160<T> = {
  [Key in keyof T]: T[Key]
}

type Assign9160<T extends Record<string, unknown>, Source extends Record<string, unknown>> = Merge9160<{
  [Key in keyof T]: Key extends keyof Source ? Source[Key] : T[Key]
} & Source>

type Assign<T extends Record<string, unknown>, U> = U extends unknown[]
  ? U extends [infer Cur, ...infer Rest]
    ? Cur extends Record<string, unknown>
      ? Assign<Assign9160<T, Cur>, Rest>
      : Assign<T, Rest>
    : T
  : T
