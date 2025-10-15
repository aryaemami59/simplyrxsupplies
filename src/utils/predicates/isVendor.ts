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

export const isVendor = complexDataTypePredicateFactory(vendorProperties)
