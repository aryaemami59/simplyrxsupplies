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
