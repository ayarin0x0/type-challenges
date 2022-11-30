type Whitespace106 = ' ' | '\n' | '\t'

type TrimLeft<S extends string> = S extends `${infer FC}${infer Rest}`
  ? FC extends Whitespace106
    ? TrimLeft<Rest>
    : S
  : S
