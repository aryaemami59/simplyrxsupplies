import type { Item } from "../../types/api.js"
import type { ObjectChecker } from "../../types/tsHelpers.js"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate.js"
import { isArrayOfNumbers } from "./isArrayOfNumbers.js"
import { isArrayOfNumbersOrEmpty } from "./isArrayOfNumbersOrEmpty.js"
import { isArrayOfStrings } from "./isArrayOfStrings.js"
import { isNumber } from "./isNumber.js"
import { isString } from "./isString.js"

const itemProperties: ObjectChecker<Item> = {
  id: isNumber,
  name: isString,
  itemNumber: isString,
  keywords: isArrayOfStrings,
  categoryIds: isArrayOfNumbersOrEmpty,
  vendorIds: isArrayOfNumbers,
  src: isString,
}

export const isItem = complexDataTypePredicateFactory(itemProperties)
