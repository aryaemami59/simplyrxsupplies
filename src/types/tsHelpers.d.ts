export type UnknownObject = Record<string, unknown>;

export type EmptyObject = Record<string, never>;

export type EmptyTuple = [];

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
