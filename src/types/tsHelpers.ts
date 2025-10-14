import type { PropsWithChildren, ReactNode } from "react"

export type UnknownObject = Record<string, unknown>

export type EmptyTuple = []

/**
 * Omits keys from a type, **distributing** the operation over a union.
 * TypeScript’s {@linkcode Omit} does **not** distribute over unions,
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
 * ```tsx
 * type A = {
 *   discriminant: 'A';
 *   foo: string;
 *   a: number;
 * };
 *
 * type B = {
 *   discriminant: 'B';
 *   foo: string;
 *   b: string;
 * };
 *
 * type Union = A | B;
 *
 * type OmittedUnion = Omit<Union, 'foo'>;
 * // => { discriminant: 'A' | 'B' }
 *
 * const omittedUnion: OmittedUnion = createOmittedUnion();
 *
 * if (omittedUnion.discriminant === 'A') {
 *   // We would like to narrow `omittedUnion`’s type to `A` here,
 *   // but we can’t because `Omit` doesn’t distribute over unions.
 *
 *   omittedUnion.a;
 *   // => Error: Property 'a' does not exist on type '{ discriminant: "A" | "B" }'
 * }
 * ```
 *
 * @template ObjectType - The base object or union type to omit properties from.
 * @template KeyType - The keys of {@linkcode ObjectType} to omit.
 */
export type DistributedOmit<
  ObjectType,
  KeyType extends keyof ObjectType,
> = ObjectType extends unknown ? Omit<ObjectType, KeyType> : never

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
export type PropsWithRequiredChildren<Props = unknown> = Props & {
  /**
   * The **required** {@linkcode PropsWithRequiredChildren.children | children}
   * to render inside the component.
   */
  readonly children: ReactNode
}

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

export type Simplify<BaseType> = BaseType extends BaseType
  ? NonNullable<unknown> & {
      [KeyType in keyof BaseType]: BaseType[KeyType]
    }
  : never

export type Primitive =
  | bigint
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined

export type JsonPrimitive = boolean | number | string | null
export type JsonValue = JsonArray | JsonObject | JsonPrimitive
export type JsonObject = { [Key in string]: JsonValue }
export type JsonArray = JsonValue[] | readonly JsonValue[]
