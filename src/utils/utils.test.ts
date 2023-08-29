import { filterByMatchingText } from './index';

describe('filterByMatchingText', () => {
  const data = [
    { id: 1, title: 'photo 1' },
    { id: 2, title: 'photo 2' },
    { id: 3, title: 'photo 3' },
  ];

  it('filters items based on title containing search criteria', () => {
    const filteredData = filterByMatchingText(data, 'photo 1', 'title');
    expect(filteredData).toHaveLength(1);
    expect(filteredData[0].id).toBe(1);
  });

  it('returns empty array when no matches are found', () => {
    const filteredData = filterByMatchingText(data, 'photo 5', 'title');
    expect(filteredData).toHaveLength(0);
  });

  it('is case-insensitive', () => {
    const filteredData = filterByMatchingText(data, 'photo 2', 'title');
    expect(filteredData).toHaveLength(1);
    expect(filteredData[0].id).toBe(2);
  });
});
