import axios from 'axios';

import { NodeItem } from '../app/models';
import { getObjFromArray, getData } from '../common/utils';

const API_URL = 'http://localhost:5000/';
const NODES_PATH = 'nodes/';

const instance = axios.create({
  baseURL: API_URL,
});

const getNodes = async () => await instance.get(`${NODES_PATH}`).then(getData);

const getNode = async (id: number) =>
  await instance
    .get(`${NODES_PATH}${id}`)
    .then(getData)
    .then((data: NodeItem[]) => {
      const selectedNode = getObjFromArray(data)(id);

      return selectedNode ? selectedNode : undefined;
    });

const getVariables = async () => await instance.get('variables').then(getData);

const search = async (query: string) =>
  await instance.post(`${NODES_PATH}search`, { query }).then(getData);

export { getNodes, getNode, getVariables, search };
