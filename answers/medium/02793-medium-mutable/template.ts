type Mutable<T extends Record<PropertyKey, any>> = {
  -readonly [Key in keyof T]: T[Key]
}
