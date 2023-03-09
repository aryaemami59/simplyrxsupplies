import type { ItemName } from "../types/api";
import emptyArr from "./emptyArr";
import sortResults from "./sortResults";

const search = (value: string, itemNames: ItemName[]) => {
  const inputValue = value
    .trim()
    .toLowerCase()
    .replace(/\s{2,}/, " ");

  const strictSearchValue = inputValue
    .split(/\s+/gi)
    .map((f: string, i: number, arr: string[]) =>
      i !== arr.length - 1 ? `(\\b(${f})+\\b)` : `(\\b(${f}))`
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
    ? itemNames
        .filter(itemName => itemName.toLowerCase().trim().match(searchRegExp))
        .sort(
          (a, b) =>
            sortResults(b, searchRegExp, inputValue) -
            sortResults(a, searchRegExp, inputValue)
        )
    : // .slice(0, 20)
      emptyArr;
};

export default search;
