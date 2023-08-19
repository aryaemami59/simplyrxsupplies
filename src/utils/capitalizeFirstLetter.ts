/**
 * Takes a string and returns the same string with the first letter capitalized
 * @param str String whose first letter is going to be capitalized
 */

const capitalizeFirstLetter = <const S extends string>(str: S): Capitalize<S> =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>;

export default capitalizeFirstLetter;
