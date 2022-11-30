type ControlsMap147 = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type Directives147 = keyof ControlsMap147

type Start147<S extends string> = Read147<S, []>
type Finish147<Res extends string[]> = Res

type ReadDirective<S extends string, Res extends string[]> = S extends `${infer Cur}${infer Rest}`
  ? Cur extends Directives147
    ? Read147<Rest, [...Res, ControlsMap147[Cur]]>
    : Read147<Rest, Res>
  : Finish147<Res>

type Read147<S extends string, Res extends string[]> = S extends `${infer Cur}${infer Rest}`
  ? Cur extends '%'
    ? ReadDirective<Rest, Res>
    : Read147<Rest, Res>
  : Finish147<Res>

type ParsePrintFormat<S extends string> = Start147<S>
