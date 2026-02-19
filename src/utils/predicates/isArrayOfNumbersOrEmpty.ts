import { isNumber } from "./isNumber.js"

export const isArrayOfNumbersOrEmpty = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(isNumber)
