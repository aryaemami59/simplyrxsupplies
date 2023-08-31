import type { EmptyTuple } from "../../types/tsHelpers";
import EMPTY_ARRAY from "../emptyArray";
import isEmptyArray from "./isEmptyArray";

export const isEmptyArrayReference = <T extends readonly unknown[]>(
  array: T
): array is EmptyTuple & T =>
  isEmptyArray(array) && Object.is(array, EMPTY_ARRAY);

export default isEmptyArrayReference;
