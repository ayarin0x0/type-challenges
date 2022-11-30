type IsRequired89<Value, Key extends keyof T, T> =
  Value extends { [K in keyof T]-?: T[K] }[Key]
    ? true
    : false

type GetRequired89<T> = {
  [Key in keyof T as IsRequired89<T[Key], Key, T> extends true ? Key : never]: T[Key]
}

type RequiredKeys<T> = keyof GetRequired89<T>
