import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import { NodeItem } from '../app/models';
import { getKeyFromArray, removeDuplicates } from '../common/utils';
import { getNodes as getNodesFromApi } from '../common/api-utils';

export const NodesAdapter = createEntityAdapter<NodeItem>({
  selectId: (node) => node.id,
});
export const initialState = NodesAdapter.getInitialState({
  loading: false,
  contentId: 0,
});

const getNodes = createAsyncThunk('nodes', async () => {
  const response = await getNodesFromApi();
  return (await response) as NodeItem[];
});

const NodesSlice = createSlice({
  name: 'Nodes',
  initialState,
  reducers: {
    nodesLoading(state) {
      state.loading = !state.loading;
    },
    upsertMany(state, action) {
      const { payload } = action;
      const { results, nodeIds } = payload;
      const getNodeIds = getKeyFromArray('id');
      const resultIds = getNodeIds(results);
      const removeNodes = removeDuplicates(nodeIds);

      NodesAdapter.upsertMany(state, results);
      NodesAdapter.removeMany(state, removeNodes(resultIds));
    },
    nodeUpdated(state, action) {
      const { payload } = action;
      const { id } = payload;

      NodesAdapter.updateOne(state, payload);
      state.contentId = id;
    },
    updateContentId(state, action) {
      const { payload } = action;

      state.contentId = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getNodes.fulfilled, (state, action) => {
      NodesAdapter.setAll(state, action.payload);
      state.loading = false;
    });
  },
});

export const {
  selectById: selectNodeById,
  selectAll: selectAllNodes,
  selectIds: selectNodeIds,
} = NodesAdapter.getSelectors<RootState>((state) => state.nodeItems);

const {
  nodesLoading,
  nodeUpdated,
  upsertMany,
  updateContentId,
} = NodesSlice.actions;

export { nodesLoading, getNodes, nodeUpdated, upsertMany, updateContentId };
export default NodesSlice.reducer;
