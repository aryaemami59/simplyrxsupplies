/**
 * Takes a string and returns the same string with the first letter converted to uppercase. The function version of the native `Capitalize` utility type in TypeScript.
 * @param str - String that is going to be capitalized.
 * @returns Capitalized version of the string.
 * @see {@link Capitalize}
 */
const capitalize = <const S extends string>(str: S): Capitalize<S> =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>

export default capitalize
