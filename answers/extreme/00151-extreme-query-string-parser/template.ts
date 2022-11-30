type Equal151<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type Merge151<T> = {
  [Key in keyof T]: T[Key]
}

type MergeValue151<V, T, RawT = T> = T extends unknown[]
  ? T extends [infer Cur, ...infer Rest]
    ? Equal151<V, Cur> extends true
      ? T
      : MergeValue151<V, Rest, RawT>
    : RawT extends unknown[] ? [...RawT, V] : never
  : Equal151<V, T> extends true
    ? T
    : [T, V]

type AssignHelper151<T extends Record<string, unknown>, Source extends Record<string, unknown>> = Merge151<{
  [Key in keyof T]: Key extends keyof Source ? MergeValue151<Source[Key], T[Key]> : T[Key]
} & {
  [Key in keyof Source]: Key extends keyof T ? MergeValue151<Source[Key], T[Key]> : Source[Key]
}>

type Assign151<T extends Record<string, unknown>, U> = U extends unknown[]
  ? U extends [infer Cur, ...infer Rest]
    ? Cur extends Record<string, unknown>
      ? Assign<AssignHelper151<T, Cur>, Rest>
      : Assign<T, Rest>
    : T
  : T

type ParseKV<KV extends string, Res extends Record<string, unknown>> = KV extends `${infer K}=${infer V}`
  ? Assign151<Res, [{ [Key in K]: V }]>
  : KV extends '' ? Res : Assign151<Res, [{ [Key in KV]: true }]>

type Parse151<S extends string, Res extends Record<string, unknown> = {}> = S extends `${infer KV}&${infer Rest}`
  ? Parse151<Rest, ParseKV<KV, Res>>
  : ParseKV<S, Res>

type ParseQueryString<S extends string> = Parse151<S>
