import sortNumbers from "./sortNumbers";
import withEmptyArrayFallback from "./withEmptyArrayFallback";

export const withNumsArrayConcat = <T extends number>(array: T[]): T[] =>
  sortNumbers([...new Set(array)]);

export const withNumsArrayFilter = <T extends number>(array: T[]): T[] =>
  sortNumbers(withEmptyArrayFallback(array));
