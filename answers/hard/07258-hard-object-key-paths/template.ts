type GenNode<K extends string | number, Root extends boolean> = Root extends true
  ? `${K}`
  : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never)

type ObjectKeyPaths<
  T extends object,
  Root extends boolean = true,
  K extends keyof T = keyof T,
> = K extends string | number
  ? | GenNode<K, Root>
    | (
      T[K] extends object
        ? `${GenNode<K, Root>}${ObjectKeyPaths<T[K], false>}`
        : never
    )
  : never
