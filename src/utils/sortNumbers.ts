export const sortNumbers = <T extends number>(array: T[]): T[] =>
  array.sort((a, b) => a - b)
