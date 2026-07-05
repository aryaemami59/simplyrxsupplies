import type {
  ObjectChecker,
  ObjectEntries,
  UnknownObject,
} from "../../types/tsHelpers.js"
import { isObject } from "./isObject.js"

/**
 * Creates a type-guard function for a complex object type
 * {@linkcode ObjectType} by checking that:
 * 1. The value passes {@linkcode isObject}.
 * 2. Every key defined in {@linkcode checker} is present in the value and passes the corresponding predicate.
 * 3. The value has **exactly** the same set of keys as {@linkcode checker} (verified by comparing sorted JSON-serialized key arrays).
 *
 * @param checker - An {@linkcode ObjectChecker} mapping each key of {@linkcode ObjectType} to a predicate for that key's value type.
 * @returns A type-guard function.
 */
export const complexDataTypePredicateFactory =
  /**
   * @template ObjectType - The object type the generated predicate narrows to.
   */
  <ObjectType extends UnknownObject>(checker: ObjectChecker<ObjectType>) =>
    (value: unknown): value is ObjectType =>
      isObject(value) &&
      (
        Object.entries(checker) as ObjectEntries<ObjectChecker<ObjectType>>
      ).every(
        ([key, predicate]) =>
          key in value && predicate(value[key as keyof typeof value]),
      ) &&
      JSON.stringify(Object.keys(value).sort()) ===
        JSON.stringify(Object.keys(checker).sort())
