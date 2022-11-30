// https://github.com/type-challenges/type-challenges/issues/657
// 这题没有什么兴趣...
type LengthOfString<S extends string, R extends number[] = []> =
  S extends `${infer _}${infer _}${infer _}${infer _}${infer _}${infer _}${infer _}${infer _}${infer _}${infer _}${infer Rest}`
    ? LengthOfString<Rest, [...R, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>
    : S extends `${infer _}${infer Rest}`
      ? LengthOfString<Rest, [...R, 1]>
      : [...R]['length']
