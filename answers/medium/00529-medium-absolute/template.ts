type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer Num}` ? Num : `${T}`
