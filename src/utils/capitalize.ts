/**
 * Takes a string and returns the same string with
 * the first letter converted to uppercase.
 * The function version of the native
 * {@linkcode Capitalize} utility type in TypeScript.
 *
 * @param inputString - String that is going to be capitalized.
 * @returns Capitalized version of the {@linkcode inputString | input string}.
 * @see {@linkcode Capitalize}
 */
export const capitalize = <const StringToCapitalize extends string>(
  inputString: StringToCapitalize,
): Capitalize<StringToCapitalize> =>
  (inputString.charAt(0).toUpperCase() +
    inputString.slice(1)) as Capitalize<StringToCapitalize>
