/**
 * https://github.com/microsoft/TypeScript/pull/39094
 */

declare function PromiseAll<Value extends unknown[]>(values: readonly [...Value]): Promise<{
  [Key in keyof Value]: Value[Key] extends Promise<infer T> ? T : Value[Key]
}>

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
