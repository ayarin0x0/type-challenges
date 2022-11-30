type Last<T extends any[]> = T extends [...unknown[], infer Tail] ? Tail : never
