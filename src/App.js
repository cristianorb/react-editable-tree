import React from 'react';
import Tree from './components/Tree';
import { DATA } from './data';

function App() {
  return (    
    <Tree 
      data={DATA}
      showRoot={false}
    />
  );
}

export default App;
