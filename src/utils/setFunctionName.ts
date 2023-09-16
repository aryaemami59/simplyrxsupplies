import type { NeverFunction } from "../types/tsHelpers";

const setFunctionName = (func: NeverFunction, name: string) => {
  Object.defineProperty(func, "name", { value: name });
};

export default setFunctionName;
