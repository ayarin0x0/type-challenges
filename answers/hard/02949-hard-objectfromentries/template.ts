type Tuple2949 = [string, unknown]
type Merge2949<T> = {
  [Key in keyof T]: T[Key]
}

type ToIntersection2949<T> = (T extends unknown ? (arg: () => T) => void : never) extends (arg: infer R) => void ? R : never
type GetIntersectionLast2949<T> = T extends () => infer R ? R : never
type UnionToArray2949<T, Res extends unknown[] = []> =
  [T] extends [never]
    ? Res
    : GetIntersectionLast2949<ToIntersection2949<T>> extends infer Item
      ? UnionToArray2949<Exclude<T, Item>, [...Res, Item]>
      : never

type ArrayToObject2949<T extends Tuple2949[]> = T extends [infer Cur extends Tuple2949, ...infer Rest extends Tuple2949[]]
  ? { [Key in Cur[0]]: Cur[1] } & ArrayToObject2949<Rest>
  : unknown

type ObjectFromEntries<T> = UnionToArray2949<T> extends infer Arr extends Tuple2949[] ? Merge2949<ArrayToObject2949<Arr>> : never

