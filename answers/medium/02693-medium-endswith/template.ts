type EndsWith<T extends string, U extends string> = T extends `${infer Char}${U}`
  ? true : false
