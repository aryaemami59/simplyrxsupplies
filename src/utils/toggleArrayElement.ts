import setToEmptyArray from "./setToEmptyArray";

const toggleArrayElement = <T>(array: T[], element: T): T[] =>
  array.includes(element)
    ? setToEmptyArray(array.filter(e => e !== element))
    : [...new Set(array.concat(element))];

export default toggleArrayElement;
