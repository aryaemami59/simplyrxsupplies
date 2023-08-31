import type { ItemNameAndKeywords } from "../../types/api";

const sortResults = (
  itemNameAndKeyword: ItemNameAndKeywords,
  searchRegexPattern: RegExp,
  inputValue: string
): number => {
  let relevancyScore = 0;
  const { name, keywords } = itemNameAndKeyword;
  const itemName = name.toLowerCase();
  if (itemName === inputValue) {
    relevancyScore += 100;
  } else if (itemName.startsWith(`${inputValue} `)) {
    relevancyScore += 85;
  } else if (itemName.startsWith(inputValue)) {
    relevancyScore += 75;
  } else if (itemName.includes(` ${inputValue} `)) {
    relevancyScore += 70;
  } else if (itemName.includes(`${inputValue} `)) {
    relevancyScore += 65;
  } else if (itemName.includes(` ${inputValue}`)) {
    relevancyScore += 60;
  } else if (itemName.includes(inputValue)) {
    relevancyScore += 50;
  } else if (keywords.includes(inputValue)) {
    const keywordsScore = keywords.reduce(
      (total, keyword) =>
        inputValue.includes(keyword) || searchRegexPattern.test(keyword)
          ? total + 1
          : total,
      0
    );
    relevancyScore += keywordsScore;
  }
  relevancyScore += itemName.match(searchRegexPattern)?.length ?? 0;
  return relevancyScore;
};

export default sortResults;
