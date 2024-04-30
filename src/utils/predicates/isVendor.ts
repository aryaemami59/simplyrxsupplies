import type { Vendor } from "../../types/api"
import type { ObjectChecker } from "../../types/tsHelpers"
import { complexDataTypePredicateFactory } from "./complexDataTypePredicate"
import { isArrayOfNumbers } from "./isArrayOfNumbers"
import { isNumber } from "./isNumber"
import { isString } from "./isString"

const vendorProperties: ObjectChecker<Vendor> = {
  id: isNumber,
  officialName: isString,
  abbrName: isString,
  link: isString,
  joinChars: isString,
  itemIds: isArrayOfNumbers,
} as ObjectChecker<Vendor>

export const isVendor = complexDataTypePredicateFactory(vendorProperties)
