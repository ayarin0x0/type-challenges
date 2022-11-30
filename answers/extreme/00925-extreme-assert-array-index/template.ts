// 构造数组
type BuildArray<N extends number, A extends unknown[] = []> = A['length'] extends N ? A : BuildArray<N, [...A, unknown]>

// 映射字母,用于计算字符串的hash值
type HashMap = {
  a: BuildArray<1>
  b: BuildArray<2>
  c: BuildArray<3>
  d: BuildArray<4>
  e: BuildArray<5>
  f: BuildArray<6>
  g: BuildArray<7>
  h: BuildArray<8>
  i: BuildArray<9>
  j: BuildArray<10>
  k: BuildArray<11>
  l: BuildArray<12>
  m: BuildArray<13>
  n: BuildArray<14>
  o: BuildArray<15>
  p: BuildArray<16>
  q: BuildArray<17>
  r: BuildArray<18>
  s: BuildArray<19>
  t: BuildArray<20>
  u: BuildArray<21>
  v: BuildArray<22>
  w: BuildArray<23>
  x: BuildArray<24>
  y: BuildArray<25>
  z: BuildArray<26>
}

// 将哈希字符串转为哈希值
type Hash<HashString extends string, HashArray extends unknown[] = []> = HashString extends `${infer F extends keyof HashMap}${infer rest}`
  ? Hash<rest, [...HashArray, ...HashMap[F]]>
  : HashArray['length']

// 当HashString不为空时,依次判断每个字符是否符合HashMap的key值
type IsHashKeyHelper<HashString extends string> = HashString extends `${infer F}${infer rest}`
  ? F extends keyof HashMap
    ? IsHashKeyHelper<rest>
    : false
  : true

// 当HashString为空时,返回false
type IsHashKey<HashString extends string> = HashString extends '' ? false : IsHashKeyHelper<HashString>

// declare const KEY: unique symbol

// 给数组 A 的类型挂载一个唯一的哈希值symbol => hashKey,以及哈希值对应的数组元素类型,hashKey => A[number]
function assertArrayIndex<A extends readonly unknown[], HashString extends string>(
  array: number extends A['length'] ? A : never, // 判断 A 是否是只读元组,是的话 A['length'] 会返回具体数字,则 array: never
  hashString: IsHashKey<HashString> extends true ? HashString : never, // 判断 hashString 是否是有效的哈希字符串
): asserts array is (number extends A['length']  // 如果 A 是只读元组, 则断言 array 为 never 类型
  ? A &
    { readonly [KEY]: Hash<HashString> } & // 暂存 A 的哈希值, 在 Index 工具函数中取出
    { readonly [hashString in Hash<HashString>]: A[number] } // 访问 A[Index],若 Index 为 hashKey, 则能正确访问
  : never)
  {} // 函数体

// 取出Array的哈希值,作为遍历的索引变量的类型,这样后续访问 A[Index]
type Index<Array extends { readonly [KEY]: number }> = Array[typeof KEY]
