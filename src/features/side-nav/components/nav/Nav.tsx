import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { AppContext } from '../../../../App';
import { RootState } from '../../../../app/store';
import { selectNodeById } from '../../../../app/nodes-slice';
import { NodeItem } from '../../../../app/models';
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
  const appContext = useContext(AppContext);
  const nodeId = appContext?.currentNodeId;

  const handleSetNodeId = (id: number) => () =>
    appContext?.setCurrentNodeId(id);

  const navItems = listCollection.map((node) => {
    const { id, connections } = node;

    return (
      <ListItem onListClick={handleSetNodeId(id)} key={id} id={id}>
        <ul>
          {isSelectedNode(connections, id, nodeId as number)
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
