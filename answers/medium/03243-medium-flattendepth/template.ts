type IsDepthOverload3243<Depth extends unknown[], Limit> =
  [Depth] extends [never]
    ? true
    : Depth['length'] extends Limit
      ? true
      : false

type Flatten3243<T, Depth, DepthCounter extends unknown[] = []> =
  IsDepthOverload3243<DepthCounter, Depth> extends true
    ? T extends [infer Flat]
      ? Flat extends unknown[]
        ? Flat
        : [Flat]
      : T
    : T extends [infer Cur, ...infer Rest]
      ? Cur extends unknown[]
        ? [...Flatten3243<Cur, Depth, ['', ...DepthCounter]>, ...Flatten3243<Rest, Depth, ['', ...DepthCounter]>]
        : [Cur, ...Flatten3243<Rest, Depth, DepthCounter>]
      : T

type FlattenDepth<T extends unknown[], Depth extends number = 1> = Flatten3243<T, Depth>
