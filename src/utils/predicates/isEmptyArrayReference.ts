import { EmptyTuple } from "../../types/tsHelpers";
import EMPTY_TUPLE from "../emptyArray";
import isEmptyArray from "./isEmptyArray";

const isEmptyArrayReference = <T extends readonly unknown[]>(
  array: T
): array is EmptyTuple & T =>
  isEmptyArray(array) && Object.is(array, EMPTY_TUPLE);

export default isEmptyArrayReference;
