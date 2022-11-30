type Merge2759<T> = {
  [Key in keyof T]: T[Key]
}

type RequiredByKeys<T, K extends keyof T = keyof T> = Merge2759<{
  [Key in keyof T as Key extends K ? Key : never]-?: T[Key]
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}>
