import { fallbackToEmptyArray } from "./fallbackToEmptyArray.js"
import { sortNumbers } from "./sortNumbers.js"

/**
 * Deduplicates the elements of {@linkcode array} via a {@linkcode Set}, then
 * sorts the result in ascending numeric order using {@linkcode sortNumbers()}.
 * Intended for use after a concat operation to keep the running list of IDs
 * unique and ordered.
 *
 * @param array - The array of numbers to deduplicate and sort.
 * @returns A new sorted, deduplicated array of type {@linkcode ArrayElementType}.
 */
export const withNumsArrayConcat =
  /**
   * @template ArrayElementType - The element type of the input array, constrained to `number`.
   */
  <ArrayElementType extends number>(
    array: ArrayElementType[],
  ): ArrayElementType[] => sortNumbers([...new Set(array)])

/**
 * Passes {@linkcode array} through {@linkcode fallbackToEmptyArray()} to
 * maintain referential integrity, then sorts the result in ascending numeric
 * order using {@linkcode sortNumbers()}. Intended for use after a filter
 * operation where the result may be empty.
 *
 * @param array - The array of numbers to normalize and sort.
 * @returns Either an empty array (if empty) or a sorted copy of {@linkcode array}.
 */
export const withNumsArrayFilter =
  /**
   * @template ArrayElementType - The element type of the input array, constrained to `number`.
   */
  <ArrayElementType extends number>(
    array: ArrayElementType[],
  ): ArrayElementType[] => sortNumbers(fallbackToEmptyArray(array))
