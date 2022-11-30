declare const KEY: unique symbol

type Tuple = readonly string[]

interface Tagged {
  readonly [KEY]?: unknown
}

/**
 * Shift697<['foo', 'bar', 'baz']> = ['bar', 'baz'].
 */
type Shift697<T extends Tuple> = T extends [infer Head, ...infer Tail] ? Tail : []

/**
 * StartWith<[], ['foo']> = true.
 * StartWith<['foo'], ['foo', 'bar']> = true.
 * StartWith<['foo', 'baz'], ['foo', 'bar']> = false.
 * StartWith<['foo', 'bar'], ['foo', 'bar', 'qux']> = true.
 */
type StartWith<S extends Tuple, T extends Tuple> = S extends []
  ? true
  : Equal<S[0], T[0]> extends false
    ? false
    : StartWith<Shift697<S>, Shift697<T>>

/**
 * Includes697<['foo', 'bar'], ['quux', 'foo', 'bar', 'qux']> = true.
 * Includes697<['foo'], ['bar', 'qux']> = false.
 */
type Includes697<S extends Tuple, T extends Tuple> = S extends []
  ? true
  : T extends []
    ? false
    : Equal<S[0], T[0]> extends true
      ? StartWith<S, T>
      : Includes697<S, Shift697<T>>

/**
 * GetStringProps<{ 0: 0 x?: 3 }> = 3.
 */
type GetStringProps<T> = Exclude<
  {
    [K in keyof T & string]: T[K]
  }[keyof T & string],
  undefined
>

/**
 * GetStringKeys<{ 0: 0 x?: 3 }> = 'x'.
 */
type GetStringKeys<T> = Exclude<
  {
    [K in keyof T & string]: K
  }[keyof T & string],
  undefined
>

/**
 * GetTagsKey<null> = ''.
 * GetTagsKey<Tag<string, 'foo'>> = '0foo'.
 * GetTagsKey<Tag<Tag<string, 'foo'>, 'bar'>> = '0foo1bar'
 */
type GetTagsKey<
  V,
  TagsOrUndefined = [V] extends [Tagged] ? V[typeof KEY] : undefined,
  TagsKeyOrNever = GetStringKeys<Exclude<TagsOrUndefined, undefined>>,
> = Equal<TagsKeyOrNever, never> extends true
  ? ''
  : Equal<TagsKeyOrNever, string> extends true
    ? ''
    : TagsKeyOrNever

/**
 * GetTags<null> = [].
 * GetTags<any> = [].
 * GetTags<Tag<string, 'foo'>> = ['foo'].
 * GetTags<Tag<Tag<string, 'foo'>, 'bar'>> = ['foo', 'bar'].
 * GetTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>> = ['foo', 'bar', 'baz'].
 */
type GetTags<
  V,
  TagsOrUndefined = [V] extends [Tagged] ? V[typeof KEY] : undefined,
  TagsOrNever = GetStringProps<Exclude<TagsOrUndefined, undefined>>,
> = Equal<V, any> extends true
  ? []
  : Equal<TagsOrNever, never> extends true
    ? []
    : TagsOrNever extends Tuple
      ? TagsOrNever
      : []

/**
 * Tag<number, 'foo'> = number with tag 'foo'.
 * Tag<{ x: 0 }, 'foo'> = { x: 0 } with tag 'foo'.
 * Tag<Tag<V, 'foo'>, 'bar'> = V with tags 'foo' and 'bar'.
 */
type Tag<
  V,
  T extends string,
  Tags extends Tuple = GetTags<V>,
  TagsKey extends string = GetTagsKey<V>,
> = Equal<V, null> extends true
  ? null
  : Equal<V, undefined> extends true
    ? undefined
    : (typeof KEY extends keyof V ? Omit<V, typeof KEY> : V) & {
        readonly [KEY]?: { 0: 0 } & {
          [K in `${TagsKey}${Tags['length']}${T}`]?: [...Tags, T]
        }
      }

/**
 * UnTag<null> = null.
 * UnTag<undefined> = undefined.
 * UnTag<Tag<{}, 'foo'>> = {}.
 * UnTag<Tag<Tag<{ x: 0 }, 'foo'>, 'bar'>> = { x: 0 }.
 */
type UnTag<V> = typeof KEY extends keyof V ? Omit<V, typeof KEY> : V

/**
 * HasTag<null, 'foo'> = false.
 * HasTag<Tag<{}, 'foo'>, 'foo'> = true.
 * HasTag<Tag<any, 'foo'>, 'foo'> = true.
 * HasTag<Tag<Tag<{}, 'foo'>, 'bar'>, 'foo'> = true.
 * HasTag<Tag<Tag<symbol, 'bar'>, 'foo'>, 'foo'> = true.
 * HasTag<Tag<Tag<{}, 'bar'>, 'baz'>, 'foo'> = false.
 */
type HasTag<V, T extends string> = Includes697<[T], GetTags<V>>

/**
 * HasTags<null, ['foo']> = false.
 * HasTags<Tag<{}, 'bar'>, ['foo']> = false.
 * HasTags<Tag<any, 'bar'>, ['foo']> = false.
 * HasTags<Tag<{}, 'foo'>, ['foo']> = true.
 * HasTags<Tag<any, 'foo'>, ['foo']> = true.
 * HasTags<Tag<Tag<string, 'foo'>, 'bar'>, ['foo', 'bar']> = true.
 * HasTags<Tag<Tag<{}, 'bar'>, 'foo'>, ['foo', 'bar']> = false.
 * HasTags<Tag<Tag<Tag<{}, 'baz'>, 'foo'>, 'bar'>, ['foo', 'bar']> = true.
 * HasTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']> = true.
 * HasTags<Tag<Tag<Tag<{}, 'foo'>, 'baz'>, 'bar'>, ['foo', 'bar']> = false.
 */
type HasTags<V, T extends Tuple> = Includes697<T, GetTags<V>>

/**
 * HasExactTags<0, []> = true.
 * HasExactTags<Tag<number, 'foo'>, ['foo']> = true.
 * HasExactTags<Tag<{}, 'foo'>, ['bar']> = false.
 * HasExactTags<Tag<Tag<any, 'foo'>, 'bar'>, ['foo', 'bar']> = true.
 * HasExactTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']> = false.
 * HasExactTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar', 'baz']> = true.
 */
type HasExactTags<V, T extends Tuple> = Equal<GetTags<V>, T>
