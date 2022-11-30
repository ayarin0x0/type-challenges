import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString298<''>, 0>>,
  Expect<Equal<LengthOfString298<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString298<'reina'>, 5>>,
  Expect<Equal<LengthOfString298<'Sound! Euphonium'>, 16>>,
]
