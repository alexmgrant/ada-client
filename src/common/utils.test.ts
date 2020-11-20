import { mockNodeItem } from '../common/__mocks__/mock-node-item';
import { getKeyFromArray, removeDuplicates, getObjFromArray } from './utils';

const _mockNodeItem = { ...mockNodeItem, id: 2, title: 'another title' };
const array = [mockNodeItem, _mockNodeItem];

describe('utils', () => {
  it("getKeyFromArray returns id's", () => {
    const getIdFromArray = getKeyFromArray('id');

    expect(getIdFromArray(array)).toStrictEqual([1, 2]);
  });

  it('removeDuplicates returns collection without matches', () => {
    const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const comparitor = [2, 5, 6, 8];
    const removeFromColection = removeDuplicates(collection);

    expect(removeFromColection(comparitor)).toStrictEqual([1, 3, 4, 7, 9]);
  });

  it('getObjFromArray return obj from array', () => {
    expect(getObjFromArray(array)(2)).toStrictEqual(_mockNodeItem);
    expect(getObjFromArray(array)(1)).toStrictEqual(mockNodeItem);
  });
});
