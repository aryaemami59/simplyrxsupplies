import type { ItemNameAndKeywords } from "../../types/api.js"
import { EMPTY_ARRAY } from "../emptyArray.js"
import { fallbackToEmptyArray } from "../fallbackToEmptyArray.js"
import { sortResults } from "./sortResults.js"
import { splitBySpace } from "./splitBySpace.js"
import { trimExcessWhiteSpace } from "./trimExcessWhiteSpace.js"

export const search = (
  value: string,
  itemNamesAndKeywords: ItemNameAndKeywords[],
) => {
  const inputValue = trimExcessWhiteSpace(value)
  const inputWords = splitBySpace(inputValue)
  const looseSearchValue = inputWords.map(f => `(${f})`).join(".*")

  const searchRegexPattern = new RegExp(looseSearchValue, "dgi")

  const searchResults = fallbackToEmptyArray(
    itemNamesAndKeywords.filter(
      ({ keywords, name }) =>
        name.match(searchRegexPattern) ??
        keywords.join(" ").match(searchRegexPattern) ??
        (keywords.some(
          keyword =>
            keyword.match(searchRegexPattern) && inputValue.includes(keyword),
        ) ||
          inputWords.every(inputWord => keywords.includes(inputWord))),
    ),
  )

  return inputValue
    ? // TODO: Change to `.toSorted()`
      searchResults.sort(
        (a, b) =>
          sortResults(b, searchRegexPattern, inputValue) -
          sortResults(a, searchRegexPattern, inputValue),
      )
    : EMPTY_ARRAY
}
