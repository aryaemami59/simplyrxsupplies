import { isString } from "./isString.js"

/**
 * Type guard that checks whether {@linkcode value} is an array where every
 * element satisfies {@linkcode isString}.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} is a `string[]`.
 */
export const isArrayOfStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString)
