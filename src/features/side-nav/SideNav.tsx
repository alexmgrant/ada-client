import React from 'react';
import { useSelector } from 'react-redux';

import './SideNav.scss';
import { selectAllNodes } from '../../app/nodes-slice';
import Nav from './components/nav/Nav';
import Search from '../search/Search';

const SideNav = () => {
  const nodeItems = useSelector(selectAllNodes);

  return (
    <aside>
      <header>
        <Search></Search>
      </header>
      <Nav listCollection={nodeItems} />
    </aside>
  );
};

export default SideNav;
