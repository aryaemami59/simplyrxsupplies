import type { Category } from "../../types/api.js"
import type { ObjectChecker } from "../../types/tsHelpers.js"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate.js"
import { isArrayOfNumbers } from "./isArrayOfNumbers.js"
import { isNumber } from "./isNumber.js"
import { isString } from "./isString.js"

const categoryProperties: ObjectChecker<Category> = {
  id: isNumber,
  itemIds: isArrayOfNumbers,
  name: isString,
} as ObjectChecker<Category>

/**
 * Type guard that checks whether {@linkcode value} is a valid
 * {@linkcode Category} object. Validates the presence and types of all
 * required {@linkcode Category} properties via
 * {@linkcode complexDataTypePredicateFactory}.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} conforms to the {@linkcode Category} shape.
 */
export const isCategory = complexDataTypePredicateFactory(categoryProperties)
