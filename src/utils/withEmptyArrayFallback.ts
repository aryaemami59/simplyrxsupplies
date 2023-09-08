import EMPTY_ARRAY from "./emptyArray";
import isEmptyArray from "./predicates/isEmptyArray";

/**
 * This function is used to maintain referential integrity of a brand new array that is usually the result of calling {@link Array.map} or {@link Array.filter}.
 * It checks to see if the resulting array is empty and if it is, instead of returning the brand new empty array,
 * it will return {@link EMPTY_ARRAY} in order to prevent unnecessary reassignment of state values and maintain referential integrity as much as possible.
 * @param array - The array whose length will be checked.
 * @returns Either an empty array or the array parameter.
 * @see {@link EMPTY_ARRAY}
 */
const withEmptyArrayFallback = <T>(array: T[] | undefined): T[] => {
  if (array == null) {
    return EMPTY_ARRAY;
  }
  if (Object.is(array, EMPTY_ARRAY)) {
    return array;
  }
  return isEmptyArray(array) ? EMPTY_ARRAY : array;
};

export default withEmptyArrayFallback;
