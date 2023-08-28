import type { UnknownObject } from "../types/tsHelpers";

/**
 * A typescript helper function that improves upon the native `Object.keys` method.
 * @template {UnknownObject} T Obj must be a valid object.
 * @param {T} object Object whose keys are returned as an array.
 * @returns {(keyof T)[]}
 */
const objectKeys = <T extends UnknownObject>(object: T): (keyof T)[] =>
  Object.keys(object) as (keyof T)[];

export default objectKeys;
