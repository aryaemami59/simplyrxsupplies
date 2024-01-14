import type { ReactNode } from "react";

export type UnknownObject = Record<string, unknown>;

export type EmptyObject = Record<string, never>;

export type EmptyTuple = [];

export type Primitive =
  | bigint
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

export type PropsWithRequiredChildren<P = unknown> = P & {
  readonly children: ReactNode;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type WritableDeep<T> = {
  -readonly [K in keyof T]: T[K] extends object ? WritableDeep<T[K]> : T[K];
};

export type PartialObjectProperties<T extends object> = {
  [K in keyof T]: T[K] extends UnknownObject ? Partial<T[K]> : T[K];
};

export type ValuesOf<
  TObj extends UnknownObject,
  K extends keyof TObj = keyof TObj,
> = TObj[K];

export type ObjectEntries<
  TObj extends UnknownObject,
  K extends keyof TObj = keyof TObj,
> = TObj extends { readonly [X in K]: TObj[X] }
  ? ValuesOf<{
      readonly [X in K]: [X, Pick<TObj, X>[X]];
    }>[]
  : never;

export type Predicate<T> = (value: unknown) => value is T;

export type ObjectChecker<T extends object> = {
  [K in keyof T]: Predicate<T[K]>;
};

export type AnyNonNullishValue = NonNullable<unknown>;

export type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
} & AnyNonNullishValue;

/** Any function with arguments */
export type UnknownFunction = (...args: unknown[]) => unknown;

export type NeverFunction = (...args: never[]) => unknown;

export type AnyFunction = (...args: any[]) => unknown;

export type DropLast<T extends unknown[]> = T extends [...infer U, unknown]
  ? U
  : never;

/**
 * The infamous "convert a union type to an intersection type" hack
 * Source: https://github.com/sindresorhus/type-fest/blob/main/source/union-to-intersection.d.ts
 * Reference: https://github.com/microsoft/TypeScript/issues/29594
 */
export type UnionToIntersection<Union> = (
  Union extends unknown ? (distributedUnion: Union) => void : never
) extends (mergedIntersection: infer Intersection) => void
  ? Intersection
  : never;

export type Push<T extends unknown[], V> = [...T, V];
export type LastOf<T> =
  UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R
    ? R
    : never;
export type TuplifyUnion<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false,
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;
/**
 * Converts "the values of an object" into a tuple, like a type-level `Object.values()`
 * Source: https://stackoverflow.com/a/68695508/62937
 */
export type ObjValueTuple<
  T,
  KS extends unknown[] = TuplifyUnion<keyof T>,
  R extends unknown[] = [],
> = KS extends [infer K, ...infer KT]
  ? ObjValueTuple<T, KT, [...R, T[K & keyof T]]>
  : R;
