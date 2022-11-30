type UppercaseAlphaMap = {
  A: 'a'
  B: 'b'
  C: 'c'
  D: 'd'
  E: 'e'
  F: 'f'
  G: 'g'
  H: 'h'
  I: 'i'
  J: 'j'
  K: 'k'
  L: 'l'
  M: 'm'
  N: 'n'
  O: 'o'
  P: 'p'
  Q: 'q'
  R: 'r'
  S: 's'
  T: 't'
  U: 'u'
  V: 'v'
  W: 'w'
  X: 'x'
  Y: 'y'
  Z: 'z'
}

type UppercaseAlpha = keyof UppercaseAlphaMap

type KebabCaseCore<S> = S extends `${infer Cur}${infer Rest}`
  ? Cur extends UppercaseAlpha
    ? `-${UppercaseAlphaMap[Cur]}${KebabCaseCore<Rest>}`
    : `${Cur}${KebabCaseCore<Rest>}`
  : ''

type KebabCase<S> = S extends `${infer Cur}${infer Rest}`
  ? Cur extends UppercaseAlpha
    ? KebabCaseCore<`${UppercaseAlphaMap[Cur]}${KebabCaseCore<Rest>}`>
    : KebabCaseCore<S>
  : S
