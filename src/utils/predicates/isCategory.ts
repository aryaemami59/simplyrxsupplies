import type { Category } from "../../types/api"
import type { ObjectChecker } from "../../types/tsHelpers"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate"
import { isArrayOfNumbers } from "./isArrayOfNumbers"
import { isNumber } from "./isNumber"
import { isString } from "./isString"

const categoryProperties: ObjectChecker<Category> = {
  id: isNumber,
  name: isString,
  itemIds: isArrayOfNumbers,
} as ObjectChecker<Category>

export const isCategory = complexDataTypePredicateFactory(categoryProperties)
