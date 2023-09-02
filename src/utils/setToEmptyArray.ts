import EMPTY_ARRAY from "./emptyArray";
import isEmptyArray from "./predicates/isEmptyArray";

/**
 * This function is used to maintain referential integrity of a calculated array when the resulting calculation yields an empty array.
 * @param array - The array that will be checked.
 * @returns Either an empty array or the array parameter.
 */
const setToEmptyArray = <T>(array: T[] | undefined): T[] => {
  if (array) {
    return isEmptyArray(array) ? EMPTY_ARRAY : array;
  }
  return EMPTY_ARRAY;
};

export default setToEmptyArray;
