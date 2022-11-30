/**
 * Q: 为什么需要递归第一个数组项目?
 * - [1, 2, 3] => [1, ...[2, 3]] OK
 * - [1, [2, 3]] => [1, ...[[2, 3]]] 这里可以看到因为 Rest 自动会包裹上一层 [],
 * 而剩余数组的第二项其实是 [2, 3], 所以在第一次递归时传入的其实是 [[2, 3]],
 * 此时 Cur = [2, 3], Rest = never, 所以需要递归处理第一项
 */

type Flatten<T> = T extends [infer Cur, ...infer Rest]
  ? Cur extends unknown[]
    ? [...Flatten<Cur>, ...Flatten<Rest>]
    : [Cur, ...Flatten<Rest>]
  : T
