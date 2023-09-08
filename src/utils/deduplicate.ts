// TODO: potentially remove
const deduplicate = <T>(array: T[]): T[] => [...new Set(array)];

export default deduplicate;
