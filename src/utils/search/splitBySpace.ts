/**
 * Splits {@linkcode str} into individual words, using any run of whitespace
 * as the delimiter.
 *
 * @param str - The string to split on whitespace.
 * @returns An array of words separated by whitespace.
 */
export const splitBySpace = (str: string) => str.split(/\s+/u)
