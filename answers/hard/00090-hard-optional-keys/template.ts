type IsRequired90<Value, Key extends keyof T, T> =
  Value extends { [K in keyof T]-?: T[K] }[Key]
    ? true
    : false

type GetOptional90<T> = {
  [Key in keyof T as IsRequired90<T[Key], Key, T> extends true ? never : Key ]: T[Key]
}

type OptionalKeys<T> = keyof GetOptional90<T>
