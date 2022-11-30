type DeepMutable<T extends object> = {
  -readonly [Key in keyof T]: T[Key] extends object
    ? T[Key] extends Function
      ? T[Key]
      : DeepMutable<T[Key]>
    : T[Key]
}
