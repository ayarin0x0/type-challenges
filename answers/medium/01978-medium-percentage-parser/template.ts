type GetOperate<T> = T extends `${infer First}${infer _Rest}`
  ? First extends '+' | '-'
    ? First
    : ''
  : ''

type PercentageParser<A extends string> = A extends `${GetOperate<A>}${infer Rest}`
  ? Rest extends `${infer Rest}%`
    ? [GetOperate<A>, Rest, '%']
    : [GetOperate<A>, Rest, '']
  : never
