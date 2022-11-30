// 这里其实更难一点, 让 foo.baz.nya 去适配 Data.['foo.baz']['nya'] = true 这样的东西
type Get<T extends Record<PropertyKey, any>, K extends string> =
  K extends keyof T
    ? T[K]
    : K extends `${infer Key}.${infer RestKey}`
      ? Key extends keyof T
        ? Get<T[Key], RestKey>
        : never
      : never
