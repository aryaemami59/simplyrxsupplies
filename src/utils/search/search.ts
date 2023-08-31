import type { ItemNameAndKeywords } from "../../types/api";
import EMPTY_ARRAY from "../emptyArray";
import sortResults from "./sortResults";
import splitBySpace from "./splitBySpace";
import trimExcessWhiteSpace from "./trimExcessWhiteSpace";

const search = (value: string, itemNamesAndKeywords: ItemNameAndKeywords[]) => {
  const inputValue = trimExcessWhiteSpace(value);
  /**
   * Returns less results.
   */
  // const strictSearchValue = splitBySpace(inputValue)
  //   .map((f, index, array) =>
  //     index === array.length - 1 ? `(\\b(${f})+)` : `(\\b(${f})+\\b)`
  //   )
  //   .join(".*");

  // const looseSearchValue = splitBySpace(inputValue)
  //   .map(f => `(.*${f})`)
  //   .join("");
  const looseSearchValue = splitBySpace(inputValue)
    .map(f => `(${f})`)
    .join(".*");

  const searchRegExp = new RegExp(`${looseSearchValue}`, "dgi");
  // const searchRegExp = new RegExp(`${strictSearchValue}`, "dgi");
  // const searchRegExp = new RegExp(
  //   `${strictSearchValue}|${looseSearchValue}`,
  //   "dgi"
  // );
  // console.log(searchRegExp);

  const results = itemNamesAndKeywords.filter(
    ({ name, keywords }) =>
      name.match(searchRegExp) ??
      keywords.join(" ").match(searchRegExp) ??
      (keywords.some(
        keyword => keyword.match(searchRegExp) && inputValue.includes(keyword)
      ) ||
        splitBySpace(inputValue).every(inputWord =>
          keywords.includes(inputWord)
        ))
  );

  // console.log(results);

  return inputValue
    ? results.toSorted(
        (a, b) =>
          sortResults(b, searchRegExp, inputValue) -
          sortResults(a, searchRegExp, inputValue)
      )
    : EMPTY_ARRAY;
};

export default search;
