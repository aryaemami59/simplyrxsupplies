import isString from "./isString";

const isArrayOfStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString);

export default isArrayOfStrings;
