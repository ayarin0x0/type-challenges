type InferGetters<Getters> = {
  [Key in keyof Getters]: Getters[Key] extends (...args: any[]) => infer R ? R : never
}

declare function defineStore<Id, State, Getters, Actions>(store: {
  id: Id
  state: () => State
  getters?: Getters & ThisType<Readonly<State> & InferGetters<Getters>>
  actions: Actions & ThisType<State & Actions>
}): State & InferGetters<Getters> & Actions
