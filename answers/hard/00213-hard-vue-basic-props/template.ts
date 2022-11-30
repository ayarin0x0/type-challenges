type InferComputed<Computed> = {
  [Key in keyof Computed]: Computed[Key] extends (...args: any) => infer R
    ? R
    : never
}

// https://github.com/type-challenges/type-challenges/issues/215
type PropConstructor<T> =
  | { new (...args: any[]): T & object }
  | { (): T }
type PropType<T> = PropConstructor<T> | PropConstructor<T>[]
type Prop<T> = PropType<T> | { type?: PropType<T> }

type ArrToUnion<T extends unknown[]> = T extends [infer Cur, ...infer Rest]
  ? [Cur] | ArrToUnion<Rest>
  : T

type InferPropType<Value> = Value extends Prop<infer T>
  ? unknown extends T
    ? any
    : T
  : any

type InferProps<Props> = {
  [Key in keyof Props]: InferPropType<Props[Key]>
}

declare function VueBasicProps<
  Props,
  Data,
  Computed,
  Methods,
>(options: {
  props?: Props
  data?: (this: InferProps<Props>) => Data
  computed?: Computed & ThisType<Data & InferProps<Props>>
  methods?: Methods & ThisType<Data & Methods & InferComputed<Computed> & InferProps<Props>>
}): any
