namespace RLE {
  /* Common */

  /**
   * ToNum<'123'> => 123
   * ToNum<'123A'> => ''
   */
  type ToNum<T> = T extends `${infer N extends number}` ? N : ''

  type IsNum<T> = ToNum<T> extends number ? true : false

  /**
   * CloneChar<'A', 3> => 'AAA'
   */
  type CloneChar<C extends string, Times extends number = 1, Counter extends unknown[] = []> = Counter['length'] extends Times
    ? ''
    : `${C}${CloneChar<C, Times, [...Counter, '']>}`

  /* Encode Part */

  /**
   * EncodeCounter<'A', 'AAABBC'> => ['BBC', ['A', 'A', 'A']]
   */
  type EncodeCounter<C extends string, S extends string, Counter extends unknown[] = []> = S extends `${C}${infer Rest}`
    ? EncodeCounter<C, Rest, [...Counter, C]>
    : [S, Counter]

  /**
   * EncodeResult<[['A', 'A', 'A'], ['B', 'B'], ['C']]> => 3A2BC
   */
  type EncodeResult<T extends unknown[]> = T extends [infer Cur extends string[], ...infer Rest]
    ? `${Cur['length'] extends 1 ? '' : Cur['length']}${Cur[0]}${EncodeResult<Rest>}`
    : ''

  export type Encode<S extends string, Res extends unknown[] = []> = S extends `${infer Cur}${infer _}`
    ? EncodeCounter<Cur, S> extends [infer NextS extends string, infer Counter]
      ? Encode<NextS, [...Res, Counter]>
      : never
    : EncodeResult<Res>

  /* Decode Part */

  /**
   * DecodeResult<[['A', 3], ['B', 2], ['C', 1]]> => 'AAABBC'
   */
  type DecodeResult<T extends unknown[]> = T extends [infer Cur extends [string, number], ...infer Rest]
    ? `${CloneChar<Cur[0], Cur[1]>}${DecodeResult<Rest>}`
    : ''

  /**
   * Decode14188<'3A2BC'> => ['A', 3], ['B', 2], ['C', 1]
   */
  type Decode14188<S, CountMemo extends string = '', Res extends unknown[] = []> = S extends `${infer Cur}${infer Rest}`
    ? IsNum<Cur> extends true
      ? Decode14188<Rest, `${CountMemo}${Cur}`, Res>
      : Decode14188<Rest, '', [...Res, [Cur, CountMemo extends '' ? 1 : ToNum<CountMemo>]]>
    : DecodeResult<Res>

  export type Decode<S extends string> = Decode14188<S>
}
