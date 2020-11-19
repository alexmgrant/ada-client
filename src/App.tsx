import React from 'react';

import './App.scss';
import Content from './features/content/Content';
import SideNav from './features/side-nav/SideNav';

function App() {
  return (
    <div className="App">
      <div className="App--sidenav">
        <SideNav />
      </div>
      <main className="App--content">
        <Content />
      </main>
    </div>
  );
}

export default App;
