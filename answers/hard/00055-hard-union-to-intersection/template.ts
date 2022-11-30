// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types

type ToFunction00017<T> = T extends any ? (x: T) => any : never
type UnionToIntersection<U> = ToFunction00017<U> extends (args: infer U) => any ? U : never

/**
 * 对于 UnionToIntersection<'foo' | '42' | true> 这个测试用例
 * 推导出的结果是 never, 因为 'foo' & '42' & true 确实相当于 never...
 * 没有一个东西他又是 'foo' 又是 '42' 又是 true... 所以最后推断出的结果等同于 never
 */
