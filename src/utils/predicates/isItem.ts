import type { Item } from "../../types/api.js"
import type { ObjectChecker } from "../../types/tsHelpers.js"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate.js"
import { isArrayOfNumbers } from "./isArrayOfNumbers.js"
import { isArrayOfNumbersOrEmpty } from "./isArrayOfNumbersOrEmpty.js"
import { isArrayOfStrings } from "./isArrayOfStrings.js"
import { isNumber } from "./isNumber.js"
import { isString } from "./isString.js"

const itemProperties: ObjectChecker<Item> = {
  categoryIds: isArrayOfNumbersOrEmpty,
  id: isNumber,
  itemNumber: isString,
  keywords: isArrayOfStrings,
  name: isString,
  src: isString,
  vendorIds: isArrayOfNumbers,
}

export const isItem = complexDataTypePredicateFactory(itemProperties)
