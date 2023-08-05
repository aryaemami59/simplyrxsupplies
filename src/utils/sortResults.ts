import type { ItemNamesAndKeywords, Keywords } from "../types/api";

const sortResults = (
  itemNameAndKeyword: ItemNamesAndKeywords,
  searchRegExp: RegExp,
  inputValue: string
): number => {
  if (itemNameAndKeyword.name.toLowerCase() === inputValue) {
    return 100;
  }
  if (itemNameAndKeyword.name.toLowerCase().startsWith(inputValue)) {
    return 75;
  }
  if (itemNameAndKeyword.name.toLowerCase().includes(inputValue)) {
    return 50;
  }
  if (searchRegExp.test(itemNameAndKeyword.name.toLowerCase())) {
    return (
      itemNameAndKeyword.name.toLowerCase().match(searchRegExp)?.length ?? 0
    );
  }
  if (itemNameAndKeyword.keywords.includes(inputValue as Keywords[number])) {
    return 1;
  }
  return 0;
};

export default sortResults;
