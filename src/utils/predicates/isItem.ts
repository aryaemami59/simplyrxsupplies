import type { Item } from "../../types/api";
import type { ObjectChecker } from "../../types/tsHelpers";
import complexDataTypePredicate from "./complexDataTypePredicate";
import isArrayOfNumbers from "./isArrayOfNumbers";
import isArrayOfStrings from "./isArrayOfStrings";
import isNumber from "./isNumber";
import isString from "./isString";

const itemProperties: ObjectChecker<Item> = {
  id: isNumber,
  name: isString,
  itemNumber: isString,
  keywords: isArrayOfStrings,
  category: isArrayOfNumbers,
  vendors: isArrayOfNumbers,
  src: isString,
};

const isItem = complexDataTypePredicate(itemProperties);
// const isItem = (value: unknown): value is Item =>
//   isObject(value) &&
//   (Object.entries(itemProperties) as ObjectEntries<ObjectChecker<Item>>).every(
//     ([key, predicate]) =>
//       key in value && predicate(value[key as keyof typeof value])
//   );

export default isItem;
