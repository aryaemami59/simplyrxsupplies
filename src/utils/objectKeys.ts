import type { AnyObject } from "../types/missingTypes";

/**
 * A typescript helper function that improves upon the native `Object.keys` method.
 * @template {AnyObject} Obj Obj must be a valid object.
 * @param {Obj} obj Object whose keys are returned as an array.
 * @returns {(keyof Obj)[]}
 */
const objectKeys = <Obj extends AnyObject>(obj: Obj): (keyof Obj)[] =>
  Object.keys(obj) as (keyof Obj)[];

export default objectKeys;
