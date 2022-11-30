type Equal5<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type GetReadonlyKeys<T> = keyof {
  [Key in keyof T as Equal5<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true ? Key : never]: any
}
