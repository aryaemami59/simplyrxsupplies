import { isNumber } from "./isNumber.js"

/**
 * Type guard that checks whether {@linkcode value} is an array (including an
 * empty one) where every element satisfies {@linkcode isNumber()}. Unlike
 * {@linkcode isArrayOfNumbers()}, an empty array returns `true`.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} is a `number[]` or an empty array.
 */
export const isArrayOfNumbersOrEmpty = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(isNumber)
