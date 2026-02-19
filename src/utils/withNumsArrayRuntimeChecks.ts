import { fallbackToEmptyArray } from "./fallbackToEmptyArray.js"
import { sortNumbers } from "./sortNumbers.js"

export const withNumsArrayConcat = <T extends number>(array: T[]): T[] =>
  sortNumbers([...new Set(array)])

export const withNumsArrayFilter = <T extends number>(array: T[]): T[] =>
  sortNumbers(fallbackToEmptyArray(array))
