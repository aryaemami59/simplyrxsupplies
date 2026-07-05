/**
 * Sorts an array of numbers in ascending order **in place** using a numeric
 * comparator. Unlike the default {@linkcode Array.sort()}, which coerces
 * values to strings, this comparator preserves numeric ordering.
 *
 * @param array - The array of numbers to sort in place.
 * @returns The same {@linkcode array} reference, sorted in ascending order.
 */
export const sortNumbers =
  /**
   * @template ArrayElementType - The element type of the input array, constrained to `number`.
   */
  <ArrayElementType extends number>(
    array: ArrayElementType[],
  ): ArrayElementType[] => array.sort((a, b) => a - b)
