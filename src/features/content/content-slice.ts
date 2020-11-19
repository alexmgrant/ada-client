import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { VariableItem } from '../../app/models';
import { getVariables as getVariablesFromApi } from '../../common/api-utils';

export const VariablesAdapter = createEntityAdapter<VariableItem>({
  selectId: (variable) => variable.id,
});
export const initialState = VariablesAdapter.getInitialState({
  loading: false,
});

const getVariables = createAsyncThunk('variables', async () => {
  const response = await getVariablesFromApi();
  return (await response) as VariableItem[];
});

const VariableSlice = createSlice({
  name: 'Variables',
  initialState,
  reducers: {
    variablesLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVariables.fulfilled, (state, action) => {
      VariablesAdapter.setAll(state, action.payload);
      state.loading = false;
    });
  },
});

export const {
  selectById: selectVariableById,
  selectAll: selectAllVariables,
} = VariablesAdapter.getSelectors<RootState>((state) => state.variables);

const { variablesLoading } = VariableSlice.actions;

export { variablesLoading, getVariables };
export default VariableSlice.reducer;
