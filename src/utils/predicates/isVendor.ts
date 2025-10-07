import type { Vendor } from "../../types/api.js"
import type { ObjectChecker } from "../../types/tsHelpers.js"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate.js"
import { isArrayOfNumbers } from "./isArrayOfNumbers.js"
import { isNumber } from "./isNumber.js"
import { isString } from "./isString.js"

const vendorProperties: ObjectChecker<Vendor> = {
  id: isNumber,
  officialName: isString,
  abbrName: isString,
  link: isString,
  joinChars: isString,
  itemIds: isArrayOfNumbers,
} as ObjectChecker<Vendor>

export const isVendor = complexDataTypePredicateFactory(vendorProperties)
