import React from 'react';

import Nav from './Nav';
import { render } from '../../../../common/test-utils';
import { mockNodeItem } from '../../../../common/__mocks__/mock-node-item';
import { initialState } from '../../../../app/nodes-slice';

xit('renders without crashing', () => {
  render(<Nav listCollection={[mockNodeItem]} />, {
    initialState: initialState,
  });
});
