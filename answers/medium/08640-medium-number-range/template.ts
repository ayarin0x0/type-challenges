type NumberRangeContinue8640<Min, Max, Res = never, Counter extends unknown[] = []> =
  Counter['length'] extends Min
    ? NumberRangeSave8640<Min, Max, Min, ['', ...Counter]>
    : NumberRangeContinue8640<Min, Max, Res, ['', ...Counter]>

type NumberRangeSave8640<Min, Max, Res = never, Counter extends unknown[] = []> =
  Counter['length'] extends Max
    ? Counter['length'] | Res
    : NumberRangeSave8640<Min, Max, Counter['length'] | Res, ['', ...Counter]>

type NumberRange<L, H> = NumberRangeContinue8640<L, H>
