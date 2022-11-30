type Directives = {
  's': string
  'd': number
}

type Format<T extends string> =
  T extends `${infer _}%${infer Char}${infer Rest}`
    ? Char extends keyof Directives
      ? (arg: Directives[Char]) => Format<Rest>
      : Format<Rest>
    : string
