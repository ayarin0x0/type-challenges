// https://github.com/type-challenges/type-challenges/issues/11761

type DistributeUnions<T> = T extends unknown[]
  ? DistributeArray<T>
  : T extends object
    ? Merge869<DistributeObject<T>>
    : T

type DistributeArray<A extends unknown[]> = A extends [infer H, ...infer T]
  ? ArrHelper<DistributeUnions<H>, T>
  : []

type ArrHelper<H, T extends unknown[]> = H extends H ? [H, ...DistributeArray<T>] : never

type DistributeObject<O extends object, K extends keyof O = keyof O> = [K] extends [never]
  ? {}
  : K extends K
    ? ObjHelper<K, DistributeUnions<O[K]>> & DistributeObject<Omit<O, K>>
    : never

type ObjHelper<K, V> = V extends V ? { [k in K & string]: V } : never

type Merge869<O> = { [K in keyof O]: O[K] }

type DistributeFlatArray<A> = A extends [infer H, ...infer T]
  ? H extends H
    ? [H, ...DistributeFlatArray<T>]
    : never
  : []
