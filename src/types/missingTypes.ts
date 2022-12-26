export type AnyObject = Record<string, unknown>;

export type AnyArray = unknown[];

export type AnyFunction = () => unknown;

export type EmptyObject = Record<string, never>;

export type EmptyArray = [];

export type Composite = AnyFunction | AnyArray | AnyObject;

export type AnyNonNullishValue = string | number | boolean | object | Composite;
