type ReplaceKeys<U, T, Y> =
  {
    [Key in keyof U]: Key extends T
      ? Key extends keyof Y
        ? Y[Key]
        : never
      : U[Key]
  }
