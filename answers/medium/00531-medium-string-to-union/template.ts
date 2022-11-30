type StringToUnion<T extends string> =
  T extends ''
    ? never
    : T extends `${infer Cur}${infer Rest}`
      ? Cur | StringToUnion<Rest>
      : T
