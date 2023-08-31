import EMPTY_ARRAY from "./emptyArray";
import isEmptyArray from "./predicates/isEmptyArray";
/**
 * This function is used to maintain referential integrity of a calculated array when the resulting calculation yields an empty array.
 * @param array
 */
const setToEmptyArray = <T>(array: T[] | undefined): T[] => {
  if (array) {
    return isEmptyArray(array) ? EMPTY_ARRAY : array;
  }
  return EMPTY_ARRAY;
};

export default setToEmptyArray;
