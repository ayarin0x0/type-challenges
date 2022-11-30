type Path<T> = T extends Record<PropertyKey, any>
  ? {
      [Key in keyof T]: [Key] | [Key, ...Path<T[Key]>]
    }[keyof T]
  : never
