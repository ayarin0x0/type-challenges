type AppendArgument<Fn extends Function, A> =
  Fn extends (...args: infer Args) => infer Result
    ? (...args: [...Args, A]) => Result
    : Fn

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
