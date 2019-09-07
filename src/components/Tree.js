import React, { Component } from 'react';
import TreeNode from './TreeNode';
import get from 'lodash/get';
import styled from 'styled-components';

const TreeWrapper = styled.div`
  display: flex;  
  margin: 0 auto;  
  max-width: 100%;      
`;

export default class Tree extends Component {

  state = {
    treeRoot : {
      id: -1,
      text: 'root',
      expanded: true,
      children: get(this.props, 'data', [])
    },
    showRoot: get(this.props, 'showRoot', false)
  };
  
  onToggle = (tree, item) => {
    item.expanded = !item.expanded;
    tree.setState({
        selectedItem: item
    });
  }

  createTreeNodeChildren(tree, parent, level, children, showRoot) {
    return (
      <div>
        {              
          get(parent.props.item, 'expanded') && get(children, 'length') ?
          children.map((child) => {
            let treeNodeChild = (
              <TreeNode 
                showRoot={showRoot}
                parent={parent}
                tree={tree}                 
                level={level} 
                item={child} 
                onToggle={this.onToggle}
              />
            );
            return (
              <div key={child.id}>
                {treeNodeChild}
                {this.createTreeNodeChildren(tree, treeNodeChild, level + 1, child.children, showRoot)}
              </div>
            )
          }) : undefined
        }
      </div>
    );
  }

  render() {
    let { treeRoot, showRoot } = this.state;
    let treeNodeRoot = (
      <TreeNode
        showRoot={showRoot}
        tree={this}
        level={0}
        item={treeRoot}
        onToggle={this.onToggle} 
      />
    );
    return (
      <TreeWrapper>
        <div style={{ width: '800px' }}>
          {showRoot ? treeNodeRoot : undefined}
          {this.createTreeNodeChildren(this, treeNodeRoot, 1, treeRoot.children, showRoot)}
        </div>      
      </TreeWrapper>      
    );
  }

}