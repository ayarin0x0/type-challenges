type TupleToNestedObject3188<Keys, Value> =
  Keys extends [infer Cur extends PropertyKey, ...infer Rest]
    ? { [Key in Cur]: TupleToNestedObject3188<Rest, Value> }
    : Value

type TupleToNestedObject<T extends unknown[], U> =
  T['length'] extends 0
    ? U
    : TupleToNestedObject3188<T, U>
