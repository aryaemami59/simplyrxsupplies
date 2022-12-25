import type { ItemName } from "../custom_types/api";
import emptyArr from "./emptyArr";
import sortResults from "./sortResults";

const search = (value: string, itemNames: ItemName[]) => {
  const trimmedValue = value
    .trim()
    .toLowerCase()
    .replace(/\s{2,}/, " ");
  const reg = trimmedValue
    .split(/\s+/gi)
    .map((f: string, i: number, arr: string[]) =>
      i !== arr.length - 1 ? `(\\b(${f})+\\b)` : `(\\b(${f}))`
    )
    .join(".*");
  const looseReg = trimmedValue
    .split(/\s+/gi)
    .map((f: string) => `(?=.*${f})`)
    .join("");
  const re = new RegExp(`${reg}|${looseReg}`, "gi");
  return trimmedValue
    ? itemNames
        .filter(itemName => itemName.toLowerCase().trim().match(re))
        .sort(
          (a, b) =>
            sortResults(b, re, trimmedValue) - sortResults(a, re, trimmedValue)
        )
        .slice(0, 100)
    : emptyArr;
};

export default search;
