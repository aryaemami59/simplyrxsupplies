import type {
  ObjectChecker,
  ObjectEntries,
  UnknownObject,
} from "../../types/tsHelpers";
import isObject from "./isObject";

const complexDataTypePredicateFactory =
  <T extends UnknownObject>(checker: ObjectChecker<T>) =>
  (value: unknown): value is T =>
    isObject(value) &&
    (Object.entries(checker) as ObjectEntries<ObjectChecker<T>>).every(
      ([key, predicate]) =>
        key in value && predicate(value[key as keyof typeof value])
    ) &&
    JSON.stringify(Object.keys(value).sort()) ===
      JSON.stringify(Object.keys(checker).sort());

export default complexDataTypePredicateFactory;
