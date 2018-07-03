import React from 'react';
import { shallow } from 'enzyme';
import AddPoint from '../../components/AddPoint';

let wrapper, handleError, handleAddPoint;

beforeEach(() => {
  handleError = jest.fn();
  handleAddPoint = jest.fn();
  wrapper = shallow(
    <AddPoint handleError={handleError} handleAddPoint={handleAddPoint}/>
  );
});

test('should render AddPoint correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call handleError for empty form submition', () => {
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(handleError).toHaveBeenLastCalledWith('Please add a route point');  
});

test('should set new state on input value change', () => {
  wrapper.find('input').simulate('change', {
    target: {
      value: 'Test point'
    }
  });
  expect(wrapper.state('point')).toBe('Test point');
});

test('should call handleAddPoint with new point name on submition', () => {
  wrapper.find('input').simulate('change', {
    target: {
      value: 'Test point'
    }
  });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(handleAddPoint).toHaveBeenLastCalledWith('Test point');
});

