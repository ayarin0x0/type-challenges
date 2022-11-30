type MyReadonly2<T extends Record<PropertyKey, any>, K extends keyof T = keyof T> = {
  readonly [Key in K]: T[Key]
} & {
  [Key in Exclude<keyof T, K>]: T[Key]
}
