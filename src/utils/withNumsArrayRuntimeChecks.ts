import { fallbackToEmptyArray } from "./fallbackToEmptyArray"
import { sortNumbers } from "./sortNumbers"

export const withNumsArrayConcat = <T extends number>(array: T[]): T[] =>
  sortNumbers([...new Set(array)])

export const withNumsArrayFilter = <T extends number>(array: T[]): T[] =>
  sortNumbers(fallbackToEmptyArray(array))
