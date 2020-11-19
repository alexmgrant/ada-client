import React from 'react';

import { render } from '../../../../common/test-utils';
import ParsedBody from './ParsedBody';

xit('renders without crashing', () => {
  render(<ParsedBody body={'<div></div>'}></ParsedBody>, {
    initialState: { variables: [] },
  });
});
