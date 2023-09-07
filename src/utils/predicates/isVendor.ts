import type { Vendor } from "../../types/api";
import type { ObjectChecker } from "../../types/tsHelpers";
import complexDataTypePredicate from "./complexDataTypePredicate";
import isArrayOfNumbers from "./isArrayOfNumbers";
import isNumber from "./isNumber";
import isString from "./isString";

const vendorProperties: ObjectChecker<Vendor> = {
  id: isNumber,
  officialName: isString,
  abbrName: isString,
  link: isString,
  joinChars: isString,
  itemIds: isArrayOfNumbers,
} as ObjectChecker<Vendor>;

const isVendor = complexDataTypePredicate(vendorProperties);

export default isVendor;
