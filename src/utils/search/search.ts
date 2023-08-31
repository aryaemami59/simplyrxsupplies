import type { ItemNamesAndKeywords } from "../../types/api";
import EMPTY_ARRAY from "../emptyArray";
import sortResults from "./sortResults";
import splitBySpace from "./splitBySpace";
import trimExcessWhiteSpace from "./trimExcessWhiteSpace";

const search = (
  value: string,
  itemNamesAndKeywords: ItemNamesAndKeywords[]
) => {
  const inputValue = trimExcessWhiteSpace(value);

  const strictSearchValue = splitBySpace(inputValue)
    .map((f: string, index: number, array: string[]) =>
      index === array.length - 1 ? `(\\b(${f}))` : `(\\b(${f})+\\b)`
    )
    .join(".*");

  const looseSearchValue = splitBySpace(inputValue)
    .map((f: string) => `(.*${f})`)
    .join("");

  const searchRegExp = new RegExp(
    `${strictSearchValue}|${looseSearchValue}`,
    "dgi"
  );

  const results = itemNamesAndKeywords.filter(
    ({ name, keywords }) =>
      name.toLowerCase().trim().match(searchRegExp) ??
      keywords.join(" ").match(searchRegExp) ??
      (keywords.some(
        keyword => keyword.match(searchRegExp) && inputValue.includes(keyword)
      ) ||
        splitBySpace(inputValue).every(e => keywords.includes(e)))
  );

  return inputValue
    ? results.toSorted(
        (a, b) =>
          sortResults(b, searchRegExp, inputValue) -
          sortResults(a, searchRegExp, inputValue)
      )
    : EMPTY_ARRAY;
};

export default search;
