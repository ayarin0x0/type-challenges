type Equal5181<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type MutableKeys<T> = keyof {
  [Key in keyof T as Equal5181<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true ? never : Key]: any
}
