// your answers
type Pure<T> = {
  [P in keyof T]: T[P] extends object ? Pure<T[P]> : T[P]
}

type SetProperty<T, K extends PropertyKey, V> = {
  [P in (keyof T) | K]: P extends K ? V : P extends keyof T ? T[P] : never
}

type NumberToken = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-'
type BeginObjectToken = '{'
type EndObjectToken = '}'
type BeginArrayToken = '['
type EndArrayToken = ']'
type SepColonToken = ':'
type SepCommaToken = ','
type DoubleQuoteToken = '\"'

type StringToken = `\"${string}\"`

type PrimitiveToken = StringToken | null | true | false

type SyntaxToken = BeginObjectToken | EndObjectToken | BeginArrayToken | EndArrayToken | SepColonToken | SepCommaToken

type Token = SyntaxToken | PrimitiveToken

type ToVal<F extends PrimitiveToken> = F extends `\"${infer S}\"` ? S : F

/* eslint-disable @typescript-eslint/quotes */
type ToEscape<S extends string> =
  S extends `'` ? '\'' :
    S extends `"` ? '\"' :
      S extends `n` ? '\n' :
        S extends `r` ? '\r' :
          S extends `f` ? '\f' :
            S extends `b` ? '\b' :
              S extends `t` ? '\t' : S

type GetString<S extends string, R extends string = ""> =
  S extends `\\${infer F}${infer T}`
    ? GetString<T, `${R}${ToEscape<F>}`>
    : S extends `${infer F}${infer T}`
      ? (
          F extends DoubleQuoteToken
            ? [T, `${R}${F}`]
            : F extends "\n"
              ? never
              : GetString<T, `${R}${F}`>
        )
      : never

type ToPrimitive6228<T extends string> = T extends `true` ? true : T extends 'false' ? false : T extends 'null' ? null : never

type GetPrimitive<S extends string, R extends string = ""> =
  S extends `${infer F}${infer T}`
    ? `${R}${F}` extends 'true' | 'false' | 'null' ? [T, ToPrimitive6228<`${R}${F}`>] : GetPrimitive<T, `${R}${F}`>
    : never

type ExpectToken = SepCommaToken | EndArrayToken

// 提取数组
type ParseArrayResult<T, R extends any[] = [], E = PrimitiveToken | EndArrayToken | BeginArrayToken | BeginObjectToken> = T extends [infer F, ...infer S] ?
    (F extends E ?
        (// 数组结束
          F extends EndArrayToken ? [R, S] :
          // 子数组
            F extends BeginArrayToken ? (ParseArrayResult<S> extends [infer F1, infer F2] ? ParseArrayResult<F2, [...R, F1], ExpectToken> : never) :
            // 子对象
              F extends BeginObjectToken ? (ParseObjectResult<S> extends [infer F1, infer F2] ? ParseArrayResult<F2, [...R, F1], ExpectToken> : never) :
              // 逗号标识
                F extends SepCommaToken ? ParseArrayResult<S, R, PrimitiveToken | BeginArrayToken | BeginObjectToken> :
                // 值
                  F extends PrimitiveToken ? ParseArrayResult<S, [...R, ToVal<F>], ExpectToken> : never
        ) : never
    ) : never

// 提取对象
type ParseObjectResult<T, R = {}, E = EndObjectToken | StringToken, K extends string = ''> = T extends [infer F, ...infer S]
  ? (
      // 是否符合预期标识
      F extends E ? (
        // 提取值
        K extends StringToken ? (
          // : 标识符
          F extends SepColonToken ? ParseObjectResult<S, R, PrimitiveToken | BeginArrayToken | BeginObjectToken, K> :
            // 普通值
            F extends PrimitiveToken ? ParseObjectResult<S, SetProperty<R, ToVal<K>, ToVal<F>>, SepCommaToken | EndObjectToken> :
            // 数组
              F extends BeginArrayToken ? (ParseArrayResult<S> extends [infer F1, infer F2] ? ParseObjectResult<F2, SetProperty<R, ToVal<K>, F1>, SepCommaToken | EndObjectToken> : never) :
              // 子对象
                F extends BeginObjectToken ? (ParseObjectResult<S> extends [infer F1, infer F2] ? ParseObjectResult<F2, SetProperty<R, ToVal<K>, F1>, SepCommaToken | EndObjectToken> : never) :
                  never
        ) : (
          // , token
          F extends SepCommaToken ? ParseObjectResult<S, R, StringToken, ''> :
            // key token
            F extends StringToken ? (ParseObjectResult<S, R, SepColonToken, F>) :
            // } end object
              F extends EndObjectToken ? [R, S] : never
        )
      ) : never
    ) : never

type ParseResult<K extends Token[]> = K extends [infer F, ...infer S] ? F extends BeginObjectToken ? ParseObjectResult<S> : F extends BeginArrayToken ? ParseArrayResult<S> : never : never

type Tokenize<S, T extends any[] = []> = S extends `${infer F}${infer N}` ?
  F extends SyntaxToken ? Tokenize<N, [...T, F]> :
    F extends DoubleQuoteToken ? (GetString<N, F> extends [infer A, infer B] ? Tokenize<A, [...T, B]> : never) :
      F extends 't' | 'f' | 'n' ? (GetPrimitive<S> extends [infer A, infer B] ? Tokenize<A, [...T, B]> : never) :
        F extends NumberToken ? never : Tokenize<N, T> : T

type ParseLiteral<T extends Token[]> = T extends Token[] ? T extends [PrimitiveToken] ? [ToVal<T[0]>] : ParseResult<T> : never

type Parse<T extends string> = Pure<ParseLiteral<Tokenize<T>>[0]>
