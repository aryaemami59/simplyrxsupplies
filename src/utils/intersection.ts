const intersection = <T>(firstArray: T[], secondArray: T[]): T[] =>
  firstArray.filter(e => !secondArray.includes(e));

export default intersection;
