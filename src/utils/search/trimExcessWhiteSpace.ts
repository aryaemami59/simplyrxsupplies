/**
 * Trims the leading and trailing white space.
 * It also deduplicates the excess white space in between the words.
 * @param str - the string parameter.
 * @returns the same string without excess white space.
 */
export const trimExcessWhiteSpace = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/\s{2,}/u, " ")
