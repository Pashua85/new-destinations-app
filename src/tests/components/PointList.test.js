import React from 'react';
import { shallow } from 'enzyme';
import PointList from '../../components/PointList';
import points from '../utils/points';

let wrapper, handleReorder;

beforeEach(() => {
  handleReorder = jest.fn();
  wrapper = shallow(
    <PointList 
      points={points}
      handleReorder={handleReorder}
    />
  );  
});

test('should render PointList with points', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call handleReorder on changing order', () => { 
  wrapper.find('Reorder').prop('callback')();
  expect(handleReorder).toHaveBeenCalled();
});
