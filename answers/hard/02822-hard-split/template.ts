type Split2822<S extends string, SEP extends string> = S extends `${infer Before}${SEP}${infer After}`
  ? [Before, ...Split2822<After, SEP>]
  : S extends ''
    ? SEP extends ''
      ? []
      : [S]
    : [S]

type Split<S extends string, SEP extends string> = string extends S ? string[] : Split2822<S, SEP>
