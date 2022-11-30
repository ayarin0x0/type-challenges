// enum Comparison734 {
//   Greater,
//   Equal,
//   Lower,
// }

// /**
//  * '123' -> [1, 2, 3]
//  */
// type ToIntArr<T extends string | number, Res extends unknown[] = []> = `${T}` extends `${infer Cur extends number}${infer Rest}`
//   ? ToIntArr<Rest, [...Res, Cur]>
//   : Res

// type SimpleToCounter<T extends number, Res extends unknown[] = [], Content = ''> =
//   Res['length'] extends T
//     ? Res
//     : SimpleToCounter<T, [...Res, Content], Content>

// type ToInt<T extends number | string> = `${T}` extends `${infer R extends number}`
//   ? R
//   : never

// type StrLen<T extends string> = ToIntArr<T>['length']

// /**
//  * SimpleCompare<5, 3> // Comparison734.Greater
//  * SimpleCompare<3, 5> // Comparison734.Lower
//  * SimpleCompare<5, 5> // Comparison734.Equal
//  */
// type SimpleCompare<
//   A extends number,
//   B extends number,
//   Arr extends unknown[] = SimpleToCounter<A>,
//   Brr extends unknown[] = SimpleToCounter<B>,
// > = Arr extends [...Brr, ...infer Rest extends unknown[]]
//   ? Rest['length'] extends 0
//     ? Comparison734.Equal
//     : Comparison734.Greater
//   : Comparison734.Lower

// type SameLenCompare<
//   A extends number[],
//   B extends number[],
//   Counter extends unknown[] = [],
//   Index extends number = Counter['length'],
// > = A[Index] extends undefined
//   ? Comparison734.Equal
//   : SimpleCompare<A[Index], B[Index]> extends infer R
//     ? R extends Comparison734.Greater
//       ? Comparison734.Greater
//       : R extends Comparison734.Lower
//         ? Comparison734.Lower
//         : R extends Comparison734.Equal
//           ? SameLenCompare<A, B, [...Counter, '']>
//           : never
//     : never

// type Compare<
//   A extends string,
//   B extends string,
//   LenDiff = SimpleCompare<StrLen<A>, StrLen<B>>,
// > = LenDiff extends Comparison734.Lower
//   ? Comparison734.Lower
//   : LenDiff extends Comparison734.Greater
//     ? Comparison734.Greater
//     : LenDiff extends Comparison734.Equal
//       ? SameLenCompare<ToIntArr<A>, ToIntArr<B>>
//       : never

// type Dup<T extends unknown[]> = T['length'] extends 8192
//   ? T
//   : Dup<[...T, ...T]>

// type GenArr<T extends number, Res extends unknown[] = [], Content = ''> = Comp

// type InclusiveRange<Lower extends number, Higher extends number> = any

