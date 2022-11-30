type ResolveComputed6<Computed> = {
  [Key in keyof Computed]: Computed[Key] extends (...args: any) => infer R
    ? R
    : never
}

declare function SimpleVue<
  Data,
  Computed,
  Methods,
>(options: {
  data: (this: void) => Data
  computed: Computed & ThisType<Data>
  methods: Methods & ThisType<Data & Methods & ResolveComputed6<Computed>>
}): any

declare function alert(...args: any): any
