import type { ItemNamesAndKeywords } from "../../types/api";
import splitBySpace from "./splitBySpace";

const sortResults = (
  itemNameAndKeyword: ItemNamesAndKeywords,
  searchRegExp: RegExp,
  inputValue: string
): number => {
  let relevancyScore = 0;
  if (itemNameAndKeyword.name.toLowerCase() === inputValue) {
    relevancyScore += 100;
  }
  if (itemNameAndKeyword.name.toLowerCase().startsWith(`${inputValue} `)) {
    relevancyScore += 85;
  }
  if (itemNameAndKeyword.name.toLowerCase().startsWith(` ${inputValue} `)) {
    relevancyScore += 80;
  }
  if (itemNameAndKeyword.name.toLowerCase().startsWith(inputValue)) {
    relevancyScore += 75;
  }
  if (itemNameAndKeyword.name.toLowerCase().includes(` ${inputValue} `)) {
    relevancyScore += 70;
  }
  if (itemNameAndKeyword.name.toLowerCase().includes(`${inputValue} `)) {
    relevancyScore += 65;
  }
  if (itemNameAndKeyword.name.toLowerCase().includes(` ${inputValue}`)) {
    relevancyScore += 60;
  }
  if (itemNameAndKeyword.name.toLowerCase().includes(inputValue)) {
    relevancyScore += 50;
  }
  if (searchRegExp.test(itemNameAndKeyword.name.toLowerCase())) {
    relevancyScore +=
      itemNameAndKeyword.name.toLowerCase().match(searchRegExp)?.length ?? 0;
  }
  if (
    (itemNameAndKeyword.keywords.join(" ").match(searchRegExp) ??
      itemNameAndKeyword.keywords.some(
        keyword => keyword.match(searchRegExp) && inputValue.includes(keyword)
      )) ||
    splitBySpace(inputValue).every(e => itemNameAndKeyword.keywords.includes(e))
  ) {
    const keywordsScore = itemNameAndKeyword.keywords.reduce(
      (total, curr) =>
        inputValue.includes(curr) || searchRegExp.test(curr)
          ? total + 1
          : total,
      0
    );
    relevancyScore += keywordsScore;
  }
  return relevancyScore;
};

export default sortResults;
