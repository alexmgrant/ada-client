import { NodeItem } from '../../app/models';

export const mockNodeItem: NodeItem = {
  id: 1,
  title: 'Title',
  connections: [1, 2],
  content: [
    {
      type: 'Text',
      body: 'Hey hey!',
    },
  ],
};
