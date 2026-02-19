import { objectEntries, objectFromEntries } from "../redux/createSelectors.js"
import type { AnyFunction } from "../types/tsHelpers.js"
import { setFunctionName } from "./setFunctionName.js"

export const setSelectorNames = <
  const SelectorFunctionObject extends Record<string, AnyFunction>,
>(
  selectorFunctions: SelectorFunctionObject,
): SelectorFunctionObject =>
  objectFromEntries(
    objectEntries(selectorFunctions).map(
      ([selectorName, selectorFunction]) =>
        [
          selectorName,
          setFunctionName(selectorFunction, selectorName),
        ] as const,
    ),
  ) as SelectorFunctionObject
