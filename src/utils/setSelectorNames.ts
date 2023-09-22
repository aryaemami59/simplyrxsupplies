import type { AnyFunction } from "../types/tsHelpers";
import setFunctionName from "./setFunctionName";

const setSelectorNames = <const T extends Record<string, AnyFunction>>(
  funcsObject: T
) => {
  Object.entries(funcsObject).forEach(([key, value]) => {
    setFunctionName(value, key);
  });
  return funcsObject;
};

export default setSelectorNames;
