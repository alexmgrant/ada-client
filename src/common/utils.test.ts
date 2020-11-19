import { mockNodeItem } from '../common/__mocks__/mock-node-item';
import { getKeyFromArray, removeDuplicates } from './utils';

describe('utils', () => {
  it("getKeyFromArray returns id's", () => {
    const _mockNodeItem = { ...mockNodeItem, id: 2 };
    const array = [mockNodeItem, _mockNodeItem];
    const getIdFromArray = getKeyFromArray('id');

    expect(getIdFromArray(array)).toStrictEqual([1, 2]);
  });

  it('removeDuplicates returns collection without matches', () => {
    const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const comparitor = [2, 5, 6, 8];
    const removeFromColection = removeDuplicates(collection);

    expect(removeFromColection(comparitor)).toStrictEqual([1, 3, 4, 7, 9]);
  });
});
