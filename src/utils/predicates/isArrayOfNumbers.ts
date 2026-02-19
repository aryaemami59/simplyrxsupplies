import { isNumber } from "./isNumber.js"

export const isArrayOfNumbers = (value: unknown): value is number[] =>
  Array.isArray(value) && value.length > 0 && value.every(isNumber)
