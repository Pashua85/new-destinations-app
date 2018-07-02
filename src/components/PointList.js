import React from 'react';
import Reorder from 'react-reorder';
import PointListItem from './PointListItem';

export default class PointList extends React.Component {

  itemClicked = (event, clickedItem, itemsIndex) => {
    if(event.target.closest('.remove-btn')) {
      this.props.deletePoint(clickedItem.pointId);
    }
  };

  onReorder =  (
    event,
    itemThatHasBeenMoved, 
    itemsPreviousIndex, 
    itemsNewIndex, 
    reorderedArray) => {
    this.props.handleReorder(reorderedArray);
  };

  render() {

    return (
      <Reorder
        itemKey='pointId'
        lock='horizontal'
        holdTime='100'
        list={this.props.points}
        template={PointListItem}
        callback={this.onReorder}
        itemClicked={this.itemClicked}
        itemClass={'list-item'}
      />
    )
  }
};