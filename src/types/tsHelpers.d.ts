export type AnyObject = Record<string, unknown>;

// export type AnyArray = unknown[];

// export type AnyFunction = (...args: unknown[]) => unknown;

export type EmptyObject = Record<string, never>;

// export type EmptyArray = [];

export type EmptyTuple = [];

// export type Composite = AnyArray | AnyFunction | AnyObject;

// export type ObjectOrArray = AnyArray | AnyObject;

// export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
//   T,
// >() => T extends Y ? 1 : 2
//   ? true
//   : false;

// export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// export type XOR<T, U> = T | U extends object
//   ? (T & Without<U, T>) | (U & Without<T, U>)
//   : T | U;

// export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
// export type RecursiveMutable<T> = {
//   -readonly [P in keyof T]: RecursiveMutable<T[P]>;
// };

// export type Predicate<T> = (value: T | undefined | null) => value is T;
