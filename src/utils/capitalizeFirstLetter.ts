/**
 * Takes a string and returns the same string with the first letter capitalized
 * @param str String whose first letter is going to be capitalized
 */

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default capitalizeFirstLetter;
