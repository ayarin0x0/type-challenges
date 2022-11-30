type IsOptionalKey2857<T, K extends keyof T> = { [Key in K]?: T[K] } extends { [Key in K]: T[K] } ? true : false

type IsRequiredKey<T, K extends keyof T> = [K] extends [(keyof {
  [Key in K as IsOptionalKey2857<T, Key> extends true ? never : Key ]: T[Key]
})] ? true : false
