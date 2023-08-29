export const filterByMatchingText = <T>(
  arr: T[],
  searchCriteria: string,
  keyToFilter: string
) => {
  return arr.filter((item: any) =>
    item[keyToFilter].toLowerCase().includes(searchCriteria.toLowerCase())
  );
};
