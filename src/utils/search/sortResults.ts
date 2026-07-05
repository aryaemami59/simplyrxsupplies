import type { ItemNameAndKeywords } from "../../types/api.js"

/**
 * Computes a numeric relevancy score for a single
 * {@linkcode ItemNameAndKeywords} record against a search query. Higher
 * scores indicate stronger matches. The scoring rules (in descending priority)
 * are:
 *
 * - Exact name match: +100
 * - Name starts with `"<query> "`: +85
 * - Name starts with `<query>`: +75
 * - Name contains `" <query> "`: +70
 * - Name contains `"<query> "`: +65
 * - Name contains `" <query>"`: +60
 * - Name contains `<query>`: +50
 * - Keyword match: +1 per keyword that the query covers or the regex matches
 * - Number of regex matches in the name: +1 per match
 *
 * Used as the comparator in {@linkcode search} to sort results by relevance.
 *
 * @param itemNameAndKeyword - The item record to score.
 * @param searchRegexPattern - The compiled regex built from the search query tokens.
 * @param inputValue - The normalized search query string.
 * @returns A non-negative numeric relevancy score.
 */
export const sortResults = (
  itemNameAndKeyword: ItemNameAndKeywords,
  searchRegexPattern: RegExp,
  inputValue: string,
): number => {
  let relevancyScore = 0

  const { keywords, name } = itemNameAndKeyword

  const itemName = name.toLowerCase()

  if (itemName === inputValue) {
    relevancyScore += 100
  } else if (itemName.startsWith(`${inputValue} `)) {
    relevancyScore += 85
  } else if (itemName.startsWith(inputValue)) {
    relevancyScore += 75
  } else if (itemName.includes(` ${inputValue} `)) {
    relevancyScore += 70
  } else if (itemName.includes(`${inputValue} `)) {
    relevancyScore += 65
  } else if (itemName.includes(` ${inputValue}`)) {
    relevancyScore += 60
  } else if (itemName.includes(inputValue)) {
    relevancyScore += 50
  } else if (keywords.includes(inputValue)) {
    const keywordsScore = keywords.reduce(
      (total, keyword) =>
        inputValue.includes(keyword) || searchRegexPattern.test(keyword)
          ? total + 1
          : total,
      0,
    )

    relevancyScore += keywordsScore
  }

  relevancyScore += itemName.match(searchRegexPattern)?.length ?? 0

  return relevancyScore
}
