import {
  withNumsArrayConcat,
  withNumsArrayFilter,
} from "./withNumsArrayRuntimeChecks.js"

/**
 * Will remove an {@linkcode element} from an {@linkcode array} if the
 * {@linkcode array} contains it, otherwise it will add the {@linkcode element}
 * to the {@linkcode array}.
 *
 * @param array - The array that will be modified.
 * @param element - The element that is used to modify the array.
 * @returns The modified array.
 */
export const toggleArrayElement =
  /**
   * @template ArrayElementType - The element type of the input array.
   */
  <ArrayElementType extends number>(
    array: ArrayElementType[],
    element: ArrayElementType,
  ): ArrayElementType[] =>
    array.includes(element)
      ? withNumsArrayFilter(
          array.filter(arrayElement => arrayElement !== element),
        )
      : withNumsArrayConcat(array.concat(element))
