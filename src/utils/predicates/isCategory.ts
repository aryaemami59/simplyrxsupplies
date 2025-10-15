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

export const isCategory = complexDataTypePredicateFactory(categoryProperties)
