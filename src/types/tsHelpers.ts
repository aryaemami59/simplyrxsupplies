import type { ReactNode } from "react"

export type UnknownObject = Record<string, unknown>

export type EmptyTuple = []

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

export type Simplify<T> = NonNullable<unknown> & {
  [K in keyof T]: T[K]
}

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
