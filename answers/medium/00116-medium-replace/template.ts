type Replace<S extends string, From extends string, To extends string> =
  S extends `${infer Prefix}${From}${infer Suffix}`
    ? From extends ''
      ? S
      : `${Prefix}${To}${Suffix}`
    : S
