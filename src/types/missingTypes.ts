export type AnyObject = Record<string, unknown>;

export type AnyArray = unknown[];

export type AnyFunction = (...args: unknown[]) => unknown;

export type EmptyObject = Record<string, never>;

export type EmptyArray = never[];

export type Composite = AnyFunction | AnyArray | AnyObject;

export type ObjectOrArray = AnyArray | AnyObject;

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
