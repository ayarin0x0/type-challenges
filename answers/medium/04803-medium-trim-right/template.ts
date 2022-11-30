type Whitespace4803 = ' ' | '\n' | '\t'

type TrimRight<S extends string> = S extends `${infer Rest}${Whitespace4803}` ? TrimRight<Rest> : S
