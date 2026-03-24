import type { PropsWithChildren, ReactNode } from "react"

export type UnknownObject = Record<string, unknown>

export type EmptyTuple = []

/**
 * Omits keys from a type, **distributing** the operation over a union.
 * TypeScript's {@linkcode Omit} does **not** distribute over unions,
 * which can lead to the erasure of unique properties from union members
 * when omitting keys. This causes the resulting type to retain only
 * properties common to all union members, making it impossible to access
 * member-specific properties after using {@linkcode Omit}.
 * In other words, using {@linkcode Omit} on a union merges its members into
 * a less specific type, breaking type narrowing and property access based
 * on discriminants. This utility solves that limitation by applying
 * {@linkcode Omit} distributively to each union member.
 *
 * @example
 * <caption>Demonstrating `Omit` vs `DistributedOmit`</caption>
 *
 * ```ts
 * import type { DistributedOmit } from "./typeHelpers.js";
 *
 * type A = {
 *   a: number;
 *   discriminant: "A";
 *   foo: string;
 * };
 *
 * type B = {
 *   b: string;
 *   discriminant: "B";
 *   foo: string;
 * };
 *
 * type Union = A | B;
 *
 * const omittedUnion: Omit<Union, "foo"> = {
 *   discriminant: "A",
 * };
 *
 * if (omittedUnion.discriminant === "A") {
 *   // We would like to narrow `omittedUnion`'s type to `A` here,
 *   // but we can't because `Omit` doesn't distribute over unions.
 *
 *   // @ts-expect-error
 *   omittedUnion.a;
 *   // => ❌ Error: Property 'a' does not exist on type 'Omit<Union, "foo">'.
 * }
 *
 * const distributedOmittedUnion: DistributedOmit<Union, "foo"> = {
 *   a: 123,
 *   discriminant: "A",
 * };
 *
 * if (distributedOmittedUnion.discriminant === "A") {
 *   // We can successfully narrow `distributedOmittedUnion`'s type to `A` here,
 *   // because `DistributedOmit` distributes over unions.
 *
 *   distributedOmittedUnion.a;
 *   // => ✅ OK
 * }
 * ```
 *
 * @template ObjectType - The base object or union type to omit properties from.
 * @template KeyType - The keys of {@linkcode ObjectType} to omit.
 * @internal
 */
export type DistributedOmit<
  ObjectType,
  KeyType extends keyof ObjectType,
> = ObjectType extends unknown ? Omit<ObjectType, KeyType> : never

/**
 * Picks keys from a type, **distributing** the operation over a union.
 * TypeScript's {@linkcode Pick} does **not** distribute over unions,
 * which can lead to the erasure of unique properties from union members
 * when picking keys. This causes the resulting type to retain only
 * properties common to all union members, making it impossible to access
 * member-specific properties after using {@linkcode Pick}.
 * In other words, using {@linkcode Pick} on a union merges its members into
 * a less specific type, breaking type narrowing and property access based
 * on discriminants. This utility solves that limitation by applying
 * {@linkcode Pick} distributively to each union member.
 *
 * @example
 * <caption>Demonstrating `Pick` vs `DistributedPick`</caption>
 *
 * ```ts
 * import type { DistributedPick } from "./typeHelpers.js";
 *
 * type A = {
 *   discriminant: "A";
 *   extraneous: boolean;
 *   foo: {
 *     bar: string;
 *   };
 * };
 *
 * type B = {
 *   discriminant: "B";
 *   extraneous: boolean;
 *   foo: {
 *     baz: string;
 *   };
 * };
 *
 * // Notice that `foo.bar` exists in `A` but not in `B`.
 *
 * type Union = A | B;
 *
 * const pickedUnion: Pick<Union, "discriminant" | "foo"> = {
 *   discriminant: "A",
 *   foo: {
 *     bar: "",
 *   },
 * };
 *
 * if (pickedUnion.discriminant === "A") {
 *   // We would like to narrow to `A` here,
 *   // but we can't because `Pick` doesn't distribute over unions.
 *
 *   // @ts-expect-error
 *   pickedUnion.foo.bar;
 *   //=> ❌ Error: Property 'bar' does not exist on type '{ bar: string; } | { baz: string; }'.
 *
 *   // @ts-expect-error
 *   pickedUnion.extraneous;
 *   //=> ❌ Error: Property 'extraneous' does not exist on type 'Pick<Union, "discriminant" | "foo">'.
 *
 *   // @ts-expect-error
 *   pickedUnion.foo.baz;
 *   // => ❌ Error: Property 'baz' does not exist on type '{ bar: string; } | { baz: string; }'.
 * }
 *
 * const distributedPickedUnion: DistributedPick<Union, "discriminant" | "foo"> = {
 *   discriminant: "A",
 *   foo: {
 *     bar: "",
 *   },
 * };
 *
 * if (distributedPickedUnion.discriminant === "A") {
 *   // Narrowing works correctly because the pick is applied per union member.
 *
 *   distributedPickedUnion.foo.bar;
 *   // => ✅ OK
 *
 *   // @ts-expect-error
 *   distributedPickedUnion.extraneous;
 *   //=> ❌ Error: Property 'extraneous' does not exist on type 'Pick<A, "discriminant" | "foo">'.
 *
 *   // @ts-expect-error
 *   distributedPickedUnion.foo.baz;
 *   //=> ❌ Error: Property 'baz' does not exist on type '{ bar: string; }'.
 * }
 * ```
 *
 * @template ObjectType - The base object or union type to pick properties from.
 * @template KeyType - The keys of {@linkcode ObjectType} to pick.
 * @internal
 */
export type DistributedPick<
  ObjectType,
  KeyType extends keyof ObjectType,
> = ObjectType extends unknown
  ? Pick<ObjectType, Extract<KeyType, keyof ObjectType>>
  : never

/**
 * A utility type that augments the given {@linkcode Props}
 * type with a **required**
 * {@linkcode PropsWithRequiredChildren.children | children}
 * property of type {@linkcode ReactNode}.
 *
 * @example
 * <caption>Requires both `valueToCopy` and `children`.</caption>
 *
 * ```tsx
 * import type { PropsWithRequiredChildren } from "../types/tsHelpers.js";
 *
 * type ClickToCopyTagProps = PropsWithRequiredChildren<{ valueToCopy: string }>;
 *
 * export const ClickToCopyTag = ({
 *   children,
 *   valueToCopy,
 * }: ClickToCopyTagProps) => (
 *   <ClickToCopyWrapper {valueToCopy}>
 *     <ChakraTag>{children}</ChakraTag>
 *   </ClickToCopyWrapper>
 * );
 * ```
 *
 * @template Props - The base props type to extend. **Defaults to `unknown`**.
 */
export type PropsWithRequiredChildren<Props = unknown> = Simplify<
  Props & {
    /**
     * The **required** {@linkcode PropsWithRequiredChildren.children | children}
     * to render inside the component.
     */
    readonly children: ReactNode
  }
>

/**
 * Creates a variant of the given props type **without** the
 * {@linkcode Props.children | children} property. Useful for React components
 * that should not accept {@linkcode Props.children | children}
 * while preserving all other props.
 *
 * @example
 * <caption>Button props without `children`</caption>
 *
 * ```tsx
 * import type { PropsWithoutChildren } from "../types/tsHelpers.js";
 *
 * type ButtonProps = {
 *   label: string;
 *   children?: React.ReactNode;
 * };
 *
 * type LabelOnlyProps = PropsWithoutChildren<ButtonProps>;
 * // Result: { label: string }
 * ```
 *
 * @template Props - The base props type to omit {@linkcode Props.children | children} from. Defaults to {@linkcode PropsWithChildren}.
 */
export type PropsWithoutChildren<
  Props extends PropsWithChildren = PropsWithChildren,
> = Simplify<DistributedOmit<Props, "children">>

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type WritableDeep<T> = {
  -readonly [K in keyof T]: T[K] extends object ? WritableDeep<T[K]> : T[K]
}

export type PartialObjectProperties<T extends object> = {
  [K in keyof T]: T[K] extends UnknownObject ? Partial<T[K]> : T[K]
}

export type ValuesOf<
  TObj extends UnknownObject,
  K extends keyof TObj = keyof TObj,
> = TObj[K]

export type ObjectEntries<
  TObj extends UnknownObject,
  K extends keyof TObj = keyof TObj,
> = TObj extends { readonly [X in K]: TObj[X] }
  ? ValuesOf<{
      readonly [X in K]: [X, Pick<TObj, X>[X]]
    }>[]
  : never

export type Predicate<T> = (value: unknown) => value is T

export type ObjectChecker<T extends object> = {
  [K in keyof T]: Predicate<T[K]>
}

export type AnyFunction = (...args: never[]) => unknown

export type UnknownFunction = (...args: unknown[]) => unknown

export type NonEmptyString<StringType extends string> = "" extends StringType
  ? never
  : StringType

export type IsNonEmptyString<TypeToCheck> = "" extends TypeToCheck
  ? false
  : true

export type IsNever<TypeToCheck> = [TypeToCheck] extends [never] ? true : false

export type IfNever<TypeToCheck, TypeIfNever = true, TypeIfNotNever = false> =
  IsNever<TypeToCheck> extends true ? TypeIfNever : TypeIfNotNever

/**
 * An alias for type **`{}`**. Represents any value that is not
 * **`null`** or **`undefined`**. It is mostly used for semantic purposes to
 * help distinguish between an empty object type and **`{}`**
 * as they are not the same.
 */
export type AnyNonNullishValue = NonNullable<unknown>

/**
 * Useful to flatten the type output to improve type hints shown in editors.
 * And also to transform an interface into a type to aide with assignability.
 *
 * @example
 * <caption>Basic usage</caption>
 *
 * ```ts
 * import type { Simplify } from "./typeHelpers.js";
 *
 * interface SomeInterface {
 *   bar?: string;
 *   baz: number | undefined;
 *   foo: number;
 * }
 *
 * type SomeType = {
 *   bar?: string;
 *   baz: number | undefined;
 *   foo: number;
 * };
 *
 * const literal = {
 *   bar: "hello",
 *   baz: 456,
 *   foo: 123,
 * } as const satisfies SomeType satisfies SomeInterface;
 *
 * const someType: SomeType = literal;
 * const someInterface: SomeInterface = literal;
 *
 * function fn(object: Record<string, unknown>): void {
 *   console.log(object);
 * }
 *
 * fn(literal); // ✅ Good: literal object type is sealed
 * fn(someType); // ✅ Good: type is sealed
 * // @ts-expect-error
 * fn(someInterface); // ❌ Error: Index signature for type 'string' is missing in type 'SomeInterface'. Because `interface` can be re-opened
 * fn(someInterface as Simplify<SomeInterface>); // ✅ Good: transform an `interface` into a `type`
 * ```
 *
 * @template BaseType - The type to simplify.
 *
 * @see {@link https://github.com/sindresorhus/type-fest/blob/2300245cb6f0b28ee36c2bb852ade872254073b8/source/simplify.d.ts Source}
 * @see {@link https://github.com/microsoft/TypeScript/issues/15300 | TypeScript Issue}
 * @internal
 */
export type Simplify<BaseType> = BaseType extends (...args: never[]) => unknown
  ? BaseType
  : NonNullable<unknown> & {
      [KeyType in keyof BaseType]: BaseType[KeyType]
    }

export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined

export type JsonPrimitive = boolean | null | number | string
export type JsonValue = JsonArray | JsonObject | JsonPrimitive
export type JsonObject = { [Key in string]: JsonValue }
export type JsonArray = JsonValue[] | readonly JsonValue[]

/**
 * Convert a union type to an intersection type using
 * {@link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types | distributive conditional types}.
 * Inspired by {@link https://stackoverflow.com/a/50375286/2172153 | this Stack Overflow answer}.
 *
 * @example
 * <caption>Converting a union to an intersection</caption>
 *
 * ```ts
 * import type { UnionToIntersection } from "./typeHelpers.js";
 *
 * type Union = { the(): void } | { great(arg: string): void } | { escape: boolean };
 *
 * type Intersection = UnionToIntersection<Union>;
 * //=> { the(): void } & { great(arg: string): void } & { escape: boolean }
 * ```
 *
 * @template Union - The union type to convert to an intersection.
 * @internal
 */
export type UnionToIntersection<Union> =
  // `extends unknown` is always going to be the case and is used to convert the
  // `Union` into a [distributive conditional
  // type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
  (
    Union extends unknown
      ? // The union type is used as the only argument to a function since the union
        // of function arguments is an intersection.
        (distributedUnion: Union) => void
      : // This won't happen.
        never
  ) extends // Infer the `Intersection` type since TypeScript represents the positional
  // arguments of unions of functions as an intersection of the union.
  (mergedIntersection: infer Intersection) => void
    ? // The `& Union` is to ensure result of `UnionToIntersection<A | B>` is always assignable to `A | B`
      Intersection & Union
    : never
