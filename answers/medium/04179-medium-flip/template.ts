type Flip<T extends Record<PropertyKey, any>> = {
  [Key in keyof T as Key extends Key ? `${T[Key]}` : never]: Key
}
