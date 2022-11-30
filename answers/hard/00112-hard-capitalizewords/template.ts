type CharMap112 = {
  'a': 'A'
  'b': 'B'
  'c': 'C'
  'd': 'D'
  'e': 'E'
  'f': 'F'
  'g': 'G'
  'h': 'H'
  'i': 'I'
  'j': 'J'
  'k': 'K'
  'l': 'L'
  'm': 'M'
  'n': 'N'
  'o': 'O'
  'p': 'P'
  'q': 'Q'
  'r': 'R'
  's': 'S'
  't': 'T'
  'u': 'U'
  'v': 'V'
  'w': 'W'
  'x': 'X'
  'y': 'Y'
  'z': 'Z'
}

type MakeUnion112<S, Res = never> =
  S extends `${infer Cur}${infer Rest}`
    ? MakeUnion112<Rest, Cur | Res>
    : Res

type AllAlpha112 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
type AllAlphaUnion112 = MakeUnion112<AllAlpha112>

type CapitalizeWords112<Res extends string, IsCap extends boolean, S> =
  S extends `${infer Cur}${infer Rest}`
    ? Cur extends AllAlphaUnion112
      ? IsCap extends true
        ? Cur extends keyof CharMap112
          ? CapitalizeWords112<`${Res}${CharMap112[Cur]}`, false, Rest>
          : CapitalizeWords112<`${Res}${Cur}`, false, Rest>
        : CapitalizeWords112<`${Res}${Cur}`, false, Rest>
      : CapitalizeWords112<`${Res}${Cur}`, true, Rest>
    : Res

type CapitalizeWords<S extends string> = CapitalizeWords112<'', true, S>
