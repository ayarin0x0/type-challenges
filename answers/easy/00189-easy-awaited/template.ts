type MyAwaited<T extends Promise<unknown>> =
  T extends Promise<infer A>
    ? A extends Promise<unknown>
      ? MyAwaited<A>
      : A
    : never
