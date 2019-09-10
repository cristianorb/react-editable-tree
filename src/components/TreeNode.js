import React, { Component } from 'react';
import {
  FaChevronDown, 
  FaChevronRight,
  FaFile, 
  FaFolder, 
  FaFolderOpen, 
  FaTrash
} from 'react-icons/fa';
import styled from 'styled-components';

const getPaddingLeft = (showRoot, level, item) => {
  let paddingLeft = 5;
  let paddingLeftItems = level === 0 ? 0 : showRoot ? (level) * 25 : (level - 1) * 25;
  if (item.isLeaf) paddingLeft += 16;
  return paddingLeft + paddingLeftItems;
}
  
const ActionButton = styled.div`
  font-size: 16px;
  margin-left: auto;
  display: none;
`;

const Node = styled.div`
  display: flex;
  padding: 5px 8px;
  flex-direction: row;
  align-items: center; 
  padding-left: ${props => getPaddingLeft(props.showRoot, props.level, props.item)}px;  
  &:hover {   
    background: whitesmoke;
    ${ActionButton} {
      display: inline;
    }
  } 
`;

const NodeIcon = styled.div`
  font-size: 16px;
  margin-right: ${props => props.marginRight ? props.marginRight : 8}px;
`;

const InputText = styled.input`  
  font-size: 16px;  
`

class TreeNode extends Component {

  constructor(props) {
    super(props);    
    this.state = { text: props.item.text }
  }

  onChange = (event) => {
    this.setState({text: event.target.value});
  }

  render() {
    const { showRoot, tree, item, level, onToggle, onRemove } = this.props;
    return (
      <React.Fragment>
        <Node showRoot={showRoot} level={level} item={item}>
          <NodeIcon onClick={() => onToggle(tree, item)}>
            { !item.isLeaf && (item.expanded ? <FaChevronDown /> : <FaChevronRight />) }
          </NodeIcon>
          <NodeIcon marginRight={12}>
            { item.isLeaf ? <FaFile /> : (item.expanded ? <FaFolderOpen /> : <FaFolder />) }
          </NodeIcon>
            <InputText 
              value={this.state.text}
              onChange={this.onChange}
            />
            <ActionButton>              
              <FaTrash onClick={() => onRemove(tree, item)} color={"#ff1a1a"} />
            </ActionButton>
        </Node>      
      </React.Fragment>
    );
  }

}

export default TreeNode;