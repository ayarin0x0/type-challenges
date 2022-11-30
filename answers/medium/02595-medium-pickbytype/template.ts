type PickTarget<T, U> = T extends U ? true : false

type PickByType<T, U> = {
  [Key in keyof T as T[Key] extends U ? Key : never]: T[Key]
}
