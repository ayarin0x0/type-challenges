type DropChar2059<S extends string, C extends string> = S extends `${infer Before}${C}${infer After}`
  ? `${Before}${DropChar2059<After, C>}`
  : S

type DropString<S extends string, R extends string> = R extends `${infer Cur}${infer Rest}`
  ? DropString<DropChar2059<S, Cur>, Rest>
  : S
