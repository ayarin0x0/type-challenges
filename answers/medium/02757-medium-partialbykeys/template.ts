type CloneObject2757<T> = { [Key in keyof T]: T[Key] }

type PartialByKeys<T, K extends keyof T = keyof T> = CloneObject2757<{
  [Key in keyof T as Key extends K ? Key : never]?: T[Key]
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}>

interface User {
  name: string
  age: number
  address: string
}
