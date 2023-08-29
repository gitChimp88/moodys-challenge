export const filterByMatchingText = <T>(
  arr: T[],
  searchCriteria: string,
  keyToFilter: keyof T
) => {
  return arr.filter((item: T) =>
    (item[keyToFilter] as string)
      .toLowerCase()
      .includes(searchCriteria.toLowerCase())
  );
};
