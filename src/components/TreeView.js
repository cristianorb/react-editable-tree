import React, { Component } from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import Tree from './Tree';

const TreeWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  max-width: 100%;    
  display: flex;
`;

export default class TreeView extends Component {
    
  state = {
    treeRoot : {
      id: -1,
      text: 'treeRoot',
      expanded: true,
      children: get(this.props, 'data', [])
    }
  };
  
  onRemoveItem = (item) => {
    console.log(item);
  }

  render() {
    return (        
      <TreeWrapper>
        <div style={{ width: '800px' }}>
          <Tree 
            treeRoot={this.state.treeRoot} 
            onRemoveItem={this.onRemoveItem} />
        </div>
      </TreeWrapper>
    );
  }

}