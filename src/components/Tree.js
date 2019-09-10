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
    treeRoot: {
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

  onRemove = (tree, item) => {
    let parentNode = this.getParentItem(tree, item);
    let childIndex = parentNode.children.findIndex((child) => {
      return child.id === item.id && child.text === item.text;
    });
    parentNode.children.splice(childIndex, 1);
    tree.setState({
      selectedItem: undefined
    });
    this.props.onRemoveItem(item);
  }

  getParentItem = (tree, item, itemToFind) => {
    let parent = itemToFind || tree.state.treeRoot;    
    let itemsToFind = parent.children;        
    for (let index = 0; index < itemsToFind.length; index++) {
      let itemToFind = itemsToFind[index];
      if (itemToFind.id === item.id && itemToFind.text === item.text) {
        return parent;
      }
      if (itemToFind.children) {
        let parent2 = this.getParentItem(tree, item, itemToFind);
        if (parent2) {
          return parent2;
        }
      }
    }
  }

  createTreeNodeChildren(tree, parent, children, level, showRoot) {
    return (
      <div>
        {              
          get(parent.props.item, 'expanded') && get(children, 'length') ?
          children.map((child) => {
            let treeNodeChild = (
              <TreeNode 
                showRoot={showRoot}
                tree={tree}   
                item={child}              
                level={level}                  
                onToggle={this.onToggle}
                onRemove={this.onRemove}
              />
            );
            return (
              <div key={child.id}>
                {treeNodeChild}
                {this.createTreeNodeChildren(tree, treeNodeChild, child.children, level + 1, showRoot)}
              </div>
            )
          }) : undefined
        }
      </div>
    );
  }

  render() {  
    let { treeRoot, showRoot } = this.state;
    let treeRootNode = (
      <TreeNode        
        showRoot={showRoot}        
        tree={this}        
        item={treeRoot}
        level={0}
        onToggle={this.onToggle}
        onRemove={this.onRemove}
      />
    );
    return (
      <TreeWrapper>
        <div style={{ width: '800px' }}>
          {showRoot ? treeRootNode : undefined}
          {this.createTreeNodeChildren(this, treeRootNode, treeRoot.children, 1, showRoot)}
        </div>      
      </TreeWrapper>      
    );
  }

}