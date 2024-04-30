import { isString } from "./isString"

export const isArrayOfStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString)
