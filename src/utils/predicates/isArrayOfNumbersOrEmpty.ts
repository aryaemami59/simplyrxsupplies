import isNumber from "./isNumber";

const isArrayOfNumbersOrEmpty = (value: unknown): value is number[] | [] =>
  Array.isArray(value) && value.every(isNumber);

export default isArrayOfNumbersOrEmpty;
