type ToNumber<S extends string> = S extends `${infer Num extends number}` ? Num : never
