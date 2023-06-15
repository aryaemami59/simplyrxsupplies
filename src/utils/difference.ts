const difference = <T>(firstArray: T[], secondArray: T[]): T[] =>
  firstArray.filter(firstArrayItem => !secondArray.includes(firstArrayItem));

export default difference;
