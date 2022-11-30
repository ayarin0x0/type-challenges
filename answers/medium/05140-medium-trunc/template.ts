type Trunc5140<S extends string> = S extends `${infer Cur}.${infer _}` ? Cur : S

type Trunc<T> = T extends number | string
  ? Trunc5140<`${T}`>
  : never
