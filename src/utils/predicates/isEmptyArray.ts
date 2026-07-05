import type { EmptyTuple } from "../../types/tsHelpers.js"

/**
 * Type guard that checks whether {@linkcode array} is an empty array (i.e.
 * has zero elements). Narrows the type to {@linkcode EmptyTuple} intersected
 * with the input type, preserving any additional type information.
 *
 * @param array - The array to check.
 * @returns `true` when {@linkcode array} has a length of zero.
 */
export const isEmptyArray =
  /**
   * @template ArrayType - The readonly array type being checked.
   */
  <ArrayType extends readonly unknown[]>(
    array: ArrayType,
  ): array is ArrayType & EmptyTuple =>
    Array.isArray(array) && array.length === 0
