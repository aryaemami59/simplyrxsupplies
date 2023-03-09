import type { ItemName } from "../types/api";

const sortResults = (
  itemName: ItemName,
  searchRegExp: RegExp,
  inputValue: string
): number => {
  if (itemName.toLowerCase() === inputValue) {
    return 100;
  }
  if (itemName.toLowerCase().startsWith(inputValue)) {
    return 75;
  }
  if (itemName.toLowerCase().includes(inputValue)) {
    return 50;
  }
  if (itemName.toLowerCase().match(searchRegExp)) {
    return itemName.toLowerCase().match(searchRegExp)?.length ?? 0;
  }
  return 0;
};

export default sortResults;
