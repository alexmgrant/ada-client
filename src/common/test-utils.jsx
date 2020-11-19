import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import nodes from '../app/nodes-slice';

function render(
  ui,
  { initialState, store = createStore(nodes, initialState) } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react';
export { render };
