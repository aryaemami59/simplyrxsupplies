import type { AnyObject } from "../types/tsHelpers";

/**
 * A typescript helper function that improves upon the native `Object.keys` method.
 * @template {AnyObject} T Obj must be a valid object.
 * @param {T} object Object whose keys are returned as an array.
 * @returns {(keyof T)[]}
 */
const objectKeys = <T extends AnyObject>(object: T): (keyof T)[] =>
  Object.keys(object) as (keyof T)[];

export default objectKeys;
