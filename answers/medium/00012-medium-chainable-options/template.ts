type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type Chainable<Store = {}> = {
  option<Key extends PropertyKey, Value>(
    key: Key extends keyof Store
      ? (Equal<Value, Store[Key]> extends true ? never : Key)
      : Key,
    value: Value
  ): Chainable<Omit<Store, Key> & Record<Key, Value>>
  get(): Store
}
