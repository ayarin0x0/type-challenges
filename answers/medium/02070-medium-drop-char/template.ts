type DropChar<S, C, Before extends string = ''> = S extends `${Before}${infer Cur}${infer Rest}`
  ? Rest extends ''
    ? Cur extends C ? '' : Cur
    : Cur extends C
      ? `${DropChar<S, C, `${Before}${Cur}`>}`
      : `${Cur}${DropChar<S, C, `${Before}${Cur}`>}`
  : '#'
