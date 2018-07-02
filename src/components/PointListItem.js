import React from 'react';

const PointListItem = (props) => (
  <div className="point-list__item">
    <div className="point-list__title">
      {props.item.pointName}
    </div>
    <button className='point-list__btn remove-btn'>Delete</button>
  </div>
);

export default PointListItem;