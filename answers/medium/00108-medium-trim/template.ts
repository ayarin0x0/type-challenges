type Whitespace108 = ' ' | '\n' | '\t'

type TrimLeft108<S extends string> = S extends `${Whitespace108}${infer Rest}` ? TrimLeft108<Rest> : S
type TrimRight108<S extends string> = S extends `${infer Rest}${Whitespace108}` ? TrimRight108<Rest> : S

type Trim<S extends string> = TrimRight108<TrimLeft108<S>>
