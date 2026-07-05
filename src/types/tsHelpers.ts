import type { PropsWithChildren, ReactNode } from "react"

/**
 * A plain object type with `string` keys and `unknown` values. Used as a
 * base constraint for generic object utilities throughout the codebase.
 */
export type UnknownObject = Record<string, unknown>

/**
 * The type of a tuple with zero elements. Used to represent and narrow empty
 * arrays while preserving their identity via {@linkcode EMPTY_ARRAY}.
 */
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
 * A utility type that augments the given {@linkcode Props} type with a
 * **required** {@linkcode PropsWithRequiredChildren.children | children}
 * property of type {@linkcode ReactNode}. Unlike
 * {@linkcode PropsWithChildren}, which adds an **optional**
 * {@linkcode PropsWithChildren.children | children} property of type
 * {@linkcode ReactNode}, this type requires that the
 * {@linkcode PropsWithRequiredChildren.children | children} property be
 * present.
 *
 * @example
 * <caption>Compare optional vs required `children`</caption>
 *
 * ```tsx
 * import type { PropsWithChildren } from "react";
 * import type { PropsWithRequiredChildren } from "./typeHelpers.js";
 *
 * type OptionalCardProps = PropsWithChildren<{
 *   readonly title: string;
 * }>;
 *
 * export const OptionalCard = ({ children, title }: OptionalCardProps) => (
 *   <section>
 *     <h2>{title}</h2>
 *     {children}
 *   </section>
 * );
 *
 * export const OptionalCardWrapper = () => (
 *   <OptionalCard title="Hello" /> // ✅ OK - no `children` required
 * );
 *
 * type RequiredCardProps = PropsWithRequiredChildren<{
 *   readonly title: string;
 * }>;
 *
 * export const RequiredCard = ({ children, title }: RequiredCardProps) => (
 *   <section>
 *     <h2>{title}</h2>
 *     {children}
 *   </section>
 * );
 *
 * export const RequiredCardWrapper = () => (
 *   <section>
 *     {/* @ts-expect-error *\/}
 *     <RequiredCard title="Hello" />
 *     {/* ❌ Error: `children` is required *\/}
 *
 *     <RequiredCard title="Hello">{null}</RequiredCard>
 *     {/* ✅ OK - `null` is a valid `ReactNode` *\/}
 *
 *     <RequiredCard title="Hello">
 *       <p>Content</p>
 *     </RequiredCard>
 *     {/* ✅ OK *\/}
 *   </section>
 * );
 * ```
 *
 * @template Props - The base props type to extend. **Defaults to `unknown`**.
 * @internal
 */
export type PropsWithRequiredChildren<Props = unknown> = Simplify<
  Props & {
    /**
     * The content to render inside the component. This property is
     * **required**, though its value may be any valid {@linkcode ReactNode}.
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
 * import * as React from "react";
 * import type { PropsWithoutChildren } from "./typeHelpers.js";
 *
 * type ButtonProps = {
 *   children?: React.ReactNode;
 *   label: string;
 * };
 *
 * type LabelOnlyProps = PropsWithoutChildren<ButtonProps>;
 * // Result: { label: string }
 * ```
 *
 * @template Props - The base props type to omit {@linkcode Props.children | children} from. Defaults to {@linkcode PropsWithChildren}.
 * @internal
 */
export type PropsWithoutChildren<
  Props extends PropsWithChildren = PropsWithChildren,
> =
  Props extends Pick<PropsWithChildren, "children">
    ? Simplify<Omit<Props, "children">>
    : Props

/**
 * Recursively makes all properties of {@linkcode ObjectType} optional,
 * descending into nested object types.
 *
 * @template ObjectType - The object type to make deeply partial.
 */
export type DeepPartial<ObjectType extends object> = {
  [ObjectKey in keyof ObjectType]?: ObjectType[ObjectKey] extends object
    ? DeepPartial<ObjectType[ObjectKey]>
    : ObjectType[ObjectKey]
}

/**
 * Make all properties in {@linkcode ObjectType} writable.
 *
 * @template ObjectType - The object type to make writable.
 * @internal
 */
export type Writable<ObjectType> = {
  -readonly [ObjectKey in keyof ObjectType]: ObjectType[ObjectKey]
}

/**
 * Recursively removes `readonly` modifiers from all properties of
 * {@linkcode ObjectType}, descending into nested object types.
 *
 * @template ObjectType - The object type to make deeply writable.
 */
export type WritableDeep<ObjectType extends object> = {
  -readonly [
    ObjectKey in keyof ObjectType
  ]: ObjectType[ObjectKey] extends object
    ? WritableDeep<ObjectType[ObjectKey]>
    : ObjectType[ObjectKey]
}

/**
 * For each property of {@linkcode ObjectType} whose value is itself an
 * object, wraps that value type with {@linkcode Partial}, making its nested
 * properties optional. Leaf (non-object) property types are left unchanged.
 *
 * @template ObjectType - The object type whose nested object properties will be partialized.
 */
export type PartialObjectProperties<ObjectType extends object> = {
  [ObjectKey in keyof ObjectType]: ObjectType[ObjectKey] extends UnknownObject
    ? Partial<ObjectType[ObjectKey]>
    : ObjectType[ObjectKey]
}

/**
 * Extracts a union of all value types of {@linkcode ObjectType}, optionally
 * scoped to a specific subset of keys via {@linkcode ObjectKey}.
 *
 * @template ObjectType - The object type to extract values from.
 * @template ObjectKey - The subset of keys whose values to include. Defaults to all keys.
 */
export type ValuesOf<
  ObjectType extends UnknownObject,
  ObjectKey extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ObjectKey]

/**
 * Produces a union of `[key, value]` tuple types for each key–value pair in
 * {@linkcode ObjectType}. Useful as a strongly-typed alternative to
 * {@linkcode Object.entries | Object.entries()}.
 *
 * @template ObjectType - The object type to derive entry tuples from.
 * @template ObjectKey - The subset of keys to include. Defaults to all keys.
 */
export type ObjectEntries<
  ObjectType extends UnknownObject,
  ObjectKey extends keyof ObjectType = keyof ObjectType,
> = ObjectType extends { readonly [X in ObjectKey]: ObjectType[X] }
  ? ValuesOf<{
      readonly [ObjectKeyType in ObjectKey]: [
        ObjectKeyType,
        Pick<ObjectType, ObjectKeyType>[ObjectKeyType],
      ]
    }>[]
  : never

/**
 * A type-guard function signature that narrows an `unknown` value to
 * {@linkcode TargetType}.
 *
 * @template TargetType - The type that the predicate narrows to.
 */
export type Predicate<TargetType> = (value: unknown) => value is TargetType

/**
 * A record that maps each key of {@linkcode ObjectType} to a
 * {@linkcode Predicate} for the corresponding value type. Used by
 * {@linkcode complexDataTypePredicateFactory} to validate complex objects.
 *
 * @template ObjectType - The object type whose properties are to be checked.
 */
export type ObjectChecker<ObjectType extends object> = {
  [ObjectKey in keyof ObjectType]: Predicate<ObjectType[ObjectKey]>
}

/**
 * A function type that accepts any number of arguments (typed as `never[]`
 * to allow assignment from any function) and returns `unknown`. Used as a
 * loose upper bound for generic function constraints.
 */
export type AnyFunction = (...args: never[]) => unknown

/**
 * A function type that accepts any number of `unknown` arguments and returns
 * `unknown`. Less strict than {@linkcode AnyFunction} - accepts functions
 * whose parameters are not typed as `never`.
 */
export type UnknownFunction = (...args: unknown[]) => unknown

/**
 * Excludes the empty string `""` from the given {@linkcode StringType},
 * resolving to `never` when `""` is assignable to it. Useful as a constraint
 * to reject empty-string literals at the type level.
 *
 * @template StringType - The string type to enforce non-emptiness on.
 */
export type NonEmptyString<StringType extends string> = "" extends StringType
  ? never
  : StringType

/**
 * Evaluates to `true` when {@linkcode TypeToCheck} does not include the
 * empty string `""`, and `false` otherwise.
 *
 * @template TypeToCheck - The type to test for non-emptiness.
 */
export type IsNonEmptyString<TypeToCheck> = "" extends TypeToCheck
  ? false
  : true

/**
 * Evaluates to `true` when {@linkcode TypeToCheck} is the `never` type, and
 * `false` otherwise. Uses a tuple wrapper to prevent distributive behavior
 * over unions.
 *
 * @template TypeToCheck - The type to test.
 */
export type IsNever<TypeToCheck> = [TypeToCheck] extends [never] ? true : false

/**
 * Conditional type that resolves to {@linkcode TypeIfNever} when
 * {@linkcode TypeToCheck} is `never`, and to {@linkcode TypeIfNotNever}
 * otherwise. Delegates to {@linkcode IsNever} for the check.
 *
 * @template TypeToCheck - The type to test.
 * @template TypeIfNever - The type to resolve to when `TypeToCheck` is `never`. Defaults to `true`.
 * @template TypeIfNotNever - The type to resolve to when `TypeToCheck` is not `never`. Defaults to `false`.
 */
export type IfNever<TypeToCheck, TypeIfNever = true, TypeIfNotNever = false> =
  IsNever<TypeToCheck> extends true ? TypeIfNever : TypeIfNotNever

/**
 * An alias for type **`{}`**. Represents any value that is not
 * **`null`** or **`undefined`**. It is mostly used for semantic purposes to
 * help distinguish between an empty object type and **`{}`**
 * as they are not the same.
 *
 * @internal
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

/**
 * A union of all JavaScript primitive value types:
 * `bigint`, `boolean`, `null`, `number`, `string`, `symbol`, and `undefined`.
 */
export type Primitive =
  bigint | boolean | null | number | string | symbol | undefined

/**
 * A JSON-safe primitive: `boolean`, `null`, `number`, or `string`.
 * Does not include `undefined`, `bigint`, or `symbol`, which are not valid
 * in JSON.
 *
 * @see {@linkcode JsonValue}
 */
export type JsonPrimitive = boolean | null | number | string

/**
 * Represents any valid JSON value: a {@linkcode JsonPrimitive}, a
 * {@linkcode JsonObject}, or a {@linkcode JsonArray}.
 *
 * @see {@linkcode JsonPrimitive}
 * @see {@linkcode JsonObject}
 * @see {@linkcode JsonArray}
 */
export type JsonValue = JsonArray | JsonObject | JsonPrimitive

/**
 * Represents a JSON object whose string keys map to {@linkcode JsonValue}
 * values. Equivalent to `{ [Key in string]: JsonValue }`.
 *
 * @see {@linkcode JsonValue}
 */
export type JsonObject = { [Key in string]: JsonValue }

/**
 * Represents a JSON array: either a mutable or readonly array of
 * {@linkcode JsonValue} elements.
 *
 * @see {@linkcode JsonValue}
 */
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
