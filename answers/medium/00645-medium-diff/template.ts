/**
 * O 中自己才有的属性 + O1 中自己才有的属性就是答案哦
 */
type Diff<O, O1> = Omit<O, keyof O1> & Omit<O1, keyof O> extends infer Merged
  ? { [Key in keyof Merged]: Merged[Key] }
  : never
