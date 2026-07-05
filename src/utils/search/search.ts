import type { ItemNameAndKeywords } from "../../types/api.js"
import { EMPTY_ARRAY } from "../emptyArray.js"
import { fallbackToEmptyArray } from "../fallbackToEmptyArray.js"
import { sortResults } from "./sortResults.js"
import { splitBySpace } from "./splitBySpace.js"
import { trimExcessWhiteSpace } from "./trimExcessWhiteSpace.js"

/**
 * Filters and sorts a list of {@linkcode ItemNameAndKeywords} records against
 * a free-text query string. The query is normalized via
 * {@linkcode trimExcessWhiteSpace()} and split into individual tokens via
 * {@linkcode splitBySpace()}. A loose regex pattern is built from the tokens
 * and used to match against item names and keyword lists. Returns
 * {@linkcode EMPTY_ARRAY} when the normalized query is empty. Otherwise
 * returns the matching items sorted by relevancy score computed via
 * {@linkcode sortResults()}.
 *
 * @param value - The raw search query entered by the user.
 * @param itemNamesAndKeywords - The pool of items to search against.
 * @returns A sorted array of matching {@linkcode ItemNameAndKeywords} records, or {@linkcode EMPTY_ARRAY} when the query is blank.
 */
export const search = (
  value: string,
  itemNamesAndKeywords: ItemNameAndKeywords[],
): ItemNameAndKeywords[] => {
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
