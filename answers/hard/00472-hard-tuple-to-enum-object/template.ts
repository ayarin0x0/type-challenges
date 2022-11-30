type Format472<T, Counter extends unknown[] = [], Res = {}> = T extends readonly [infer Cur extends PropertyKey, ...infer Rest]
  ? Format472<Rest, [...Counter, Cur], Readonly<Res & { readonly [Key in Cur]: Counter['length'] }>>
  : Res

type Enum<T extends readonly string[], N extends boolean = false, Map extends Record<PropertyKey, number> = Format472<T>> = {
  readonly [Key in T[number] as Capitalize<Key>]: N extends true ? Map[Key] : Key
}
