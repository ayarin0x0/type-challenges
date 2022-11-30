interface Option5821 {
  readonly mapFrom: any
  readonly mapTo: any
}

type MapTypes<T, R extends Option5821> = {
  [Key in keyof T]: T[Key] extends R['mapFrom'] ? Extract<R, { mapFrom: T[Key] }>['mapTo'] : T[Key]
}
