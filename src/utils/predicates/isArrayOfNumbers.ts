import { isNumber } from "./isNumber.js"

/**
 * Type guard that checks whether {@linkcode value} is a **non-empty** array
 * where every element satisfies {@linkcode isNumber()}. An empty array returns
 * `false` - use {@linkcode isArrayOfNumbersOrEmpty()} when an empty array is
 * acceptable.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} is a non-empty `number[]`.
 */
export const isArrayOfNumbers = (value: unknown): value is number[] =>
  Array.isArray(value) && value.length > 0 && value.every(isNumber)
