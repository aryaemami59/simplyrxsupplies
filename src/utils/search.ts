import type { ItemNamesAndKeywords } from "../types/api";
import emptyArray from "./emptyArray";
import sortResults from "./sortResults";

const search = (
  value: string,
  itemNamesAndKeywords: ItemNamesAndKeywords[]
) => {
  const inputValue = value
    .trim()
    .toLowerCase()
    .replace(/\s{2,}/, " ");

  const strictSearchValue = inputValue
    .split(/\s+/gi)
    .map((f: string, index: number, array: string[]) =>
      index === array.length - 1 ? `(\\b(${f}))` : `(\\b(${f})+\\b)`
    )
    .join(".*");

  const looseSearchValue = inputValue
    .split(/\s+/gi)
    .map((f: string) => `(?=.*${f})`)
    .join("");

  const searchRegExp = new RegExp(
    `${strictSearchValue}|${looseSearchValue}`,
    "gi"
  );

  return inputValue
    ? itemNamesAndKeywords
        .filter(
          ({ name, keywords }) =>
            name.toLowerCase().trim().match(searchRegExp) ??
            keywords.some(keyword =>
              keyword.toLowerCase().trim().match(searchRegExp)
            )
        )
        .sort(
          (a, b) =>
            sortResults(b, searchRegExp, inputValue) -
            sortResults(a, searchRegExp, inputValue)
        )
    : // .map(({ name }) => name)
      emptyArray;
};

export default search;
