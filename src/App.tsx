import React, { useEffect, useState } from 'react';

import './App.scss';
import { nodeUpdated } from './app/nodes-slice';
import { useAppDispatch } from './app/store';
import { getNode } from './common/api-utils';
import Content from './features/content/Content';
import SideNav from './features/side-nav/SideNav';

type AppContextInterface = {
  currentNodeId: number;
  setCurrentNodeId: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};
export const AppContext = React.createContext<AppContextInterface | null>(null);

const skipRequest = (currentNodeId: number) => currentNodeId === 0;

const App = () => {
  const dispatch = useAppDispatch();
  const [currentNodeId, setCurrentNodeId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (skipRequest(currentNodeId)) {
      return;
    }

    (async () => {
      const response = await getNode(currentNodeId);
      const { id, ...node } = response;

      dispatch(nodeUpdated({ id, changes: node }));
    })();
  }, [currentNodeId, dispatch]);

  return (
    <AppContext.Provider
      value={{
        currentNodeId,
        setCurrentNodeId,
        searchQuery,
        setSearchQuery,
      }}
    >
      <div className="App">
        <div className="App--sidenav">
          <SideNav />
        </div>
        <main className="App--content">
          <Content />
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
