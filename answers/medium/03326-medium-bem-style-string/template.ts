type SafeString<S> = [S] extends [never] ? '' : S

type ResolveB<B extends string> = B

type ResolveE<E extends unknown[], Prefix extends string = '__'> =
  E['length'] extends 0
    ? never
    : E extends [infer Cur, ...infer Rest]
      ? Cur extends string
        ? `${Prefix}${Cur}` | ResolveE<Rest, Prefix>
        : 'Error 1'
      : 'Error 2'

type ResolveM<M extends string[]> = ResolveE<M, '--'>

type BEM<B extends string, E extends string[], M extends string[]> =
  `${SafeString<ResolveB<B>>}${SafeString<ResolveE<E>>}${SafeString<ResolveM<M>>}`
