type GetMiddleElement<T> = T extends [infer Head, ...infer Middle, infer Tail]
  ? Middle['length'] extends 0
    ? [Head, Tail]
    : Middle['length'] extends 1
      ? Middle
      : GetMiddleElement<Middle>
  : T
