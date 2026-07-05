/**
 * Trims the leading and trailing white space, lowercases the entire string,
 * and collapses any run of two or more internal spaces down to a single space.
 *
 * @param str - The string to normalize.
 * @returns The trimmed, lowercased, and deduplicated version of {@linkcode str}.
 */
export const trimExcessWhiteSpace = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/\s{2,}/u, " ")
