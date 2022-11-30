type ArrToIntersection5423<T> = T extends unknown[] ? T[number] : T

type Intersection<T> = T extends [infer Cur, ...infer Rest]
  ? ArrToIntersection5423<Cur> & Intersection<Rest>
  : unknown
