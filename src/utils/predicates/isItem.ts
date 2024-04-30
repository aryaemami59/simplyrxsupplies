import type { Item } from "../../types/api"
import type { ObjectChecker } from "../../types/tsHelpers"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate"
import { isArrayOfNumbers } from "./isArrayOfNumbers"
import { isArrayOfNumbersOrEmpty } from "./isArrayOfNumbersOrEmpty"
import { isArrayOfStrings } from "./isArrayOfStrings"
import { isNumber } from "./isNumber"
import { isString } from "./isString"

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
