import type { Primitive } from "../types/tsHelpers";

/**
 * @param firstArray
 * @param secondArray
 * @returns An array with elements that are present in the first array but not in the second array.
 */
const arrayDifference = <const T extends Primitive>(
  firstArray: T[],
  secondArray: T[]
): T[] => firstArray.filter(item => !secondArray.includes(item));

export default arrayDifference;
