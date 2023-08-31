const trimExcessWhiteSpace = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/\s{2,}/, " ");

export default trimExcessWhiteSpace;
