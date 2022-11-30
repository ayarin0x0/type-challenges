type IsRequired57<Value, Key extends keyof T, T> =
  Value extends { [K in keyof T]-?: T[K] }[Key]
    ? true
    : false

type GetRequired<T> = {
  [Key in keyof T as IsRequired57<T[Key], Key, T> extends true ? Key : never]: T[Key]
}
