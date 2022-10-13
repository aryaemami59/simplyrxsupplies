import { ChangeEvent } from "react";
import { ItemName, EmptyObj, EmptyArr } from "../../customTypes/types";

export const sortResults = (
  searchTerm: ItemName,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.toLowerCase().match(re)) {
    return searchTerm.toLowerCase().match(re)!.length;
  }
  return 0;
};

export const intersection = (
  firstArray: string[],
  secondArray: string[]
): string[] => firstArray.filter(e => !secondArray.includes(e));

export const search = (
  e: ChangeEvent<HTMLInputElement>,
  itemNames: ItemName[]
) => {
  const trimmedValue = e.target.value
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

export const emptyArr: EmptyArr = [];

export const emptyObj: EmptyObj = {};
