const toggleArrayElement = <T>(array: T[], element: T): T[] =>
  array.includes(element)
    ? array.filter(e => e !== element)
    : array.concat(element);

export default toggleArrayElement;