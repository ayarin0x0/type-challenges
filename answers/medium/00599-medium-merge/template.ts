type Merge<F, S> = (Omit<F, keyof S> & S) extends infer Merged
  ? { [Key in keyof Merged]: Merged[Key] }
  : never
