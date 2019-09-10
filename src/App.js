import React, { Component } from 'react';
import Tree from './components/Tree';
import { DATA } from './data2';

class App extends Component { 

  onRemoveItem = (item) => {
    console.log(item);
  }
    
  render() {    
    return (    
      <Tree
        data={DATA}
        showRoot={false}
        onRemoveItem={this.onRemoveItem}
      />
    );
  }  
}

export default App;
