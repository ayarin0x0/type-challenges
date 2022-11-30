type ToPrimitive<T> =
  T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends unknown[]
          ? T extends [infer Cur, ...infer Rest]
            ? [ToPrimitive<Cur>, ...ToPrimitive<Rest>]
            : []
          : T extends Record<PropertyKey, any>
            ? {
                [Key in keyof T]: ToPrimitive<T[Key]>
              }
            : T
