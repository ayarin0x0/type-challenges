type AnyOf<T extends readonly any[]> = T extends [infer Cur, ...infer Rest]
  ? Cur extends 0 | '' | false | [] | Record<PropertyKey, never> | undefined | null
    ? AnyOf<Rest>
    : true
  : false
