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

/**
 * Type guard that checks whether {@linkcode value} is a valid {@linkcode Item}
 * object. Validates the presence and types of all required {@linkcode Item}
 * properties via {@linkcode complexDataTypePredicateFactory()}.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} conforms to the {@linkcode Item} shape.
 */
export const isItem = complexDataTypePredicateFactory(itemProperties)
