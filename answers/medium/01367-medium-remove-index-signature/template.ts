type RemoveIndexSignature<T> = {
  [Key in keyof T as string extends Key
    ? never
    : number extends Key
      ? never
      : symbol extends Key
        ? never
        : Key
  ]: T[Key]
}

type RemoveIndexSignature2<T> = {
  [Key in keyof T as Key extends `${infer NewKey}` ? NewKey : '123']: T[Key]
}
