type Integer<T> = T extends number
  ? `${T}` extends `${infer Int}.${infer Decimal}`
    ? never
    : number extends T
      ? never
      : T
  : never
