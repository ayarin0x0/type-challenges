/**
 * 1. 通过 & 合并对象
 * 2. 通过 * extends infer T 获得合并后的对象的引用
 * 3. 展开合并后的对象
 */
type AppendToObject<T, U extends PropertyKey, V> =
  (T & { [Key in U]: V }) extends infer Merged
    ? { [Key in keyof Merged]: Merged[Key] }
    : T
