import type { Vendor } from "../../types/api.js"
import type { ObjectChecker } from "../../types/tsHelpers.js"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate.js"
import { isArrayOfNumbers } from "./isArrayOfNumbers.js"
import { isNumber } from "./isNumber.js"
import { isString } from "./isString.js"

const vendorProperties: ObjectChecker<Vendor> = {
  abbrName: isString,
  id: isNumber,
  itemIds: isArrayOfNumbers,
  joinChars: isString,
  link: isString,
  officialName: isString,
} as ObjectChecker<Vendor>

/**
 * Type guard that checks whether {@linkcode value} is a valid {@linkcode Vendor}
 * object. Validates the presence and types of all required {@linkcode Vendor}
 * properties via {@linkcode complexDataTypePredicateFactory}.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} conforms to the {@linkcode Vendor} shape.
 */
export const isVendor = complexDataTypePredicateFactory(vendorProperties)
