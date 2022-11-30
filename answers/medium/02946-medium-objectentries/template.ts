type ObjectEntries<T> = ({
  [Key in keyof T]-?: [Key, T[Key] extends infer R | undefined ? R : never]
})[keyof T]
