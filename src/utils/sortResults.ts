import type { ItemName } from "../types/api";

const sortResults = (
  searchTerm: ItemName,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.toLowerCase().match(re)) {
    return searchTerm.toLowerCase().match(re)?.length ?? 0;
  }
  return 0;
};

export default sortResults;
