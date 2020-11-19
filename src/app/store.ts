import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import nodeItems from '../app/nodes-slice';
import variables from '../features/content/content-slice';

const store = configureStore({
  reducer: { nodeItems, variables },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
