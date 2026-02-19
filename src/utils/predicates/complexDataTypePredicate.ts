import type {
  ObjectChecker,
  ObjectEntries,
  UnknownObject,
} from "../../types/tsHelpers.js"
import { isObject } from "./isObject.js"

export const complexDataTypePredicateFactory =
  <T extends UnknownObject>(checker: ObjectChecker<T>) =>
  (value: unknown): value is T =>
    isObject(value) &&
    (Object.entries(checker) as ObjectEntries<ObjectChecker<T>>).every(
      ([key, predicate]) =>
        key in value && predicate(value[key as keyof typeof value]),
    ) &&
    JSON.stringify(Object.keys(value).sort()) ===
      JSON.stringify(Object.keys(checker).sort())
