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

export type WritableDeep<T> = {
  -readonly [K in keyof T]: T[K] extends object ? WritableDeep<T[K]> : T[K];
};

export type PartialObjectProperties<T extends UnknownObject> = {
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

export type ObjectChecker<T extends UnknownObject> = {
  [K in keyof T]: Predicate<T[K]>;
};
