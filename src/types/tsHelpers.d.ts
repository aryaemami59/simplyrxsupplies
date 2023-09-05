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
