import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../../../app/store';
import { nodeUpdated, selectNodeById } from '../../../../app/nodes-slice';
import { NodeItem } from '../../../../app/models';
import { getNode } from '../../../../common/api-utils';
import { Link, Card } from '../../../../components';

type NavProps = {
  listCollection: NodeItem[];
};

type NavCardProps = {
  title: string | undefined;
};

type ListItemProps = {
  id: number;
  onListClick: Function;
  children?: any;
};

const isSelectedNode = (
  connections: number[],
  id: number,
  currentNodeId: number
): boolean => connections && id === currentNodeId;

const CardItem = ({ title }: NavCardProps) => (
  <Link>
    <Card>{title}</Card>
  </Link>
);

const renderConnections = (connections: number[], handleSetNodeId: Function) =>
  connections.map((connection) => (
    <ListItem
      onListClick={handleSetNodeId(connection)}
      key={connection.toString()}
      id={connection}
    />
  ));

const ListItem = ({ onListClick, id, children }: ListItemProps) => {
  const handleItemClick = (event: any) => onListClick(event);
  const nodeItem = useSelector((state: RootState) => selectNodeById(state, id));

  return !!nodeItem ? (
    <li>
      <span onClick={handleItemClick}>
        <CardItem title={nodeItem?.title} />
      </span>
      {children}
    </li>
  ) : null;
};

const Nav = ({ listCollection }: NavProps) => {
  const dispatch = useAppDispatch();
  const [nodeId, setNodeId] = useState(1);

  const handleSetNodeId = (id: number) => () => {
    setNodeId(id);
  };

  useEffect(() => {
    (async () => {
      const response = await getNode(nodeId);
      const { id, ...node } = response;

      dispatch(nodeUpdated({ id, changes: node }));
    })();
  }, [nodeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const navItems = listCollection.map((node) => {
    const { id, connections } = node;

    return (
      <ListItem onListClick={handleSetNodeId(id)} key={id} id={id}>
        <ul>
          {isSelectedNode(connections, id, nodeId)
            ? renderConnections(connections, handleSetNodeId)
            : null}
        </ul>
      </ListItem>
    );
  });

  return (
    <nav>
      <ul>{navItems}</ul>
    </nav>
  );
};

export default Nav;
