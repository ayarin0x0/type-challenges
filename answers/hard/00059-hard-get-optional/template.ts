type IsRequired59<Value, Key extends keyof T, T> =
  Value extends { [K in keyof T]-?: T[K] }[Key]
    ? true
    : false

type GetOptional<T> = {
  [Key in keyof T as IsRequired59<T[Key], Key, T> extends true ? never : Key ]: T[Key]
}
