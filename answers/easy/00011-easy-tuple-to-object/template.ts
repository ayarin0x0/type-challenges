type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P
}

const tuple1 = ['tesla', 'model 3', 'model X', 'model Y'] as const
type b1 = TupleToObject<typeof tuple1>
