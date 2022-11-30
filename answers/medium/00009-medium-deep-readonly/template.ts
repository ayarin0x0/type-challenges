type DeepReadonly<T> = T extends object
  ? T extends () => any
    ? T
    : {
        readonly [Key in keyof T]: T extends object ? DeepReadonly<T[Key]> : T[Key];
      }
  : T
