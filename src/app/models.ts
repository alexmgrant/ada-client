export type ShallowNode = {
  id: number;
  title: string;
};

export type NodeContent = {
  body?: string;
  url?: string;
  type: string;
};

export interface NodeItem extends ShallowNode {
  content: NodeContent[];
  connections: number[];
}

export type VariableItem = {
  id: string;
  name: string;
  scrop: string;
};
