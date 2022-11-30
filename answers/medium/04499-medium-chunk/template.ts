/**
 * 1. 如果计数器到了, 就将当前加工好的数组 CurArr 推入结果中, 并且加入下一个 chunk 任务
 * 2. 如果已经消耗完了所有 T, 终止递归, 且返回当前存储的数组
 * ([], [1], [...] 第一种情况会在结果中额外增加一个空数组, 但是空数组不应该计入结果, 所以需要再次判断)
 *
 * 3. 如果计数器没到, 且没消耗完 T, 就单纯推入 CurArr (先展开上一轮存储的 1, 再推入当前获取的 2)
 */

type Chunk4499<T extends unknown[], C extends number, CurArr extends unknown[] = []> =
  CurArr['length'] extends C
    ? [CurArr, ...Chunk4499<T, C, []>] /* 1 */
    : T extends [infer Cur, ...infer Rest]
      ? Chunk4499<Rest, C, [...CurArr, Cur]> /* 3 */
      : CurArr['length'] extends 0 /* 2 */
        ? []
        : [CurArr]

type Chunk<T extends unknown[], C extends number> = Chunk4499<T, C>
