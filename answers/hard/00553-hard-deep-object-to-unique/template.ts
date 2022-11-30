type DeepObjectToUniq<O extends object, UniqueKey extends readonly unknown[] = [O]> = {
  [Key in keyof O]: O[Key] extends object
    ? DeepObjectToUniq<O[Key], [...UniqueKey, Key]>
    : O[Key]
} & {
  [x: symbol]: UniqueKey
}
