import { EmptyTuple } from "../../types/missingTypes";
import emptyArray from "../emptyArray";
import isEmptyArray from "./isEmptyArray";

const isEmptyArrayReference = <T extends readonly unknown[]>(
  array: T
): array is EmptyTuple & T =>
  isEmptyArray(array) && Object.is(array, emptyArray);

export default isEmptyArrayReference;
