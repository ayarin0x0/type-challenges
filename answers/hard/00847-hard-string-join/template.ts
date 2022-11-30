type Join847<S extends string[], Div extends string> = S extends [infer Cur extends string, ...infer Rest extends string[]]
  ? `${Cur}${Rest['length'] extends 0 ? '' : `${Div}`}${Join847<Rest, Div>}`
  : ''

declare function join<D extends string>(delimiter: D): <P extends string[]>(...parts: P) => Join847<P, D>
