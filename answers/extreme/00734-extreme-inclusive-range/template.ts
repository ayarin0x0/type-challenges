// https://github.com/type-challenges/type-challenges/issues/826

type Tuple734 = Array<0>
type Range = number[]

type Step = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

/**
 * Tail<[0, 0]> = [0].
 * Tail<[]> = [].
 */
type Tail<T extends Tuple734> = T extends [unknown, ...infer Rest] ? Rest : []

type Next = { current: Tuple734; added: Range }
type LowerAndHigher = { lower: Tuple734; higher: Tuple734 }

type UntypedDoStep<
  Current extends Tuple734,
  Limit extends number,
  Rest extends Tuple734 = Step,
  Added extends Range = [],
> = Rest extends []
  ? { current: Current; added: Added }
  : Current['length'] extends Limit
    ? { current: Current; added: Added }
    : UntypedDoStep<[0, ...Current], Limit, Tail<Rest>, [...Added, Current['length']]>

/**
 * DoStep<[], 4> = { current: [0, 0, 0, 0], added: [0, 1, 2, 3] }.
 */
type DoStep<
  Current extends Tuple734,
  Limit extends number,
> = UntypedDoStep<Current, Limit>

type UntypedLowerTuple734s<
  Lower extends number,
  Higher extends number,
  L extends Tuple734 = [],
  H extends Tuple734 = [],
> = L['length'] extends Lower
  ? { lower: L; higher: H }
  : H['length'] extends Higher
    ? { lower: L; higher: H }
    : UntypedLowerTuple734s<Lower, Higher, DoStep<L, Lower>['current'], DoStep<H, Higher>['current']>

/**
 * LowerTuple734s<3, 4> = { lower: [0, 0, 0], higher: [0, 0, 0, 0] }.
 */
type LowerTuple734s<
  Lower extends number,
  Higher extends number,
  R = UntypedLowerTuple734s<Lower, Higher>,
> = R extends LowerAndHigher ? R : never

/**
 * GreaterOrEqual<[0, 0], [0, 0]> = true.
 * GreaterOrEqual<[0, 0], [0, 0, 0]> = false.
 * GreaterOrEqual<[0, 0], [0]> = true.
 * GreaterOrEqual<[], [0]> = false.
 */
type GreaterOrEqual<X extends Tuple734, Y extends Tuple734> = X extends [...Y, ...Tuple734] ? true : false

/**
 * RangeFrom<[], 5> = [0, 1, 2, 3, 4, 5].
 * RangeFrom<[0, 0], 6> = [2, 3, 4, 5, 6].
 */
type RangeFrom<
  T extends Tuple734,
  Higher extends number,
  R extends Range = [],
  S extends Next = DoStep<T, Higher>,
> = T['length'] extends Higher
  ? [...R, T['length']]
  : RangeFrom<S['current'], Higher, [...R, ...S['added']]>

type InclusiveRange<
  Lower extends number,
  Higher extends number,
  Tuple734s extends LowerAndHigher = LowerTuple734s<Lower, Higher>,
> = GreaterOrEqual<Tuple734s['higher'], Tuple734s['lower']> extends false
  ? []
  : RangeFrom<Tuple734s['lower'], Higher>
