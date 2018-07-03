import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';
import points from '../utils/points';
import pathCoords from '../utils/pathCoords';

let wrapper;
const pointName = 'test name';
const currentCenter = {
  lat: 55.751244,
  lng: 37.618423
}

beforeEach(() => {
  wrapper = shallow(<App />);
  wrapper.find('AddPoint').prop('handleAddPoint')(pointName);
})

test('should render App', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should add points', () => {
  expect(wrapper.state('points').length).toEqual(1);
});

test('should set pathCoords', () => {
  expect(wrapper.state('pathCoords')[0]).toEqual(currentCenter);
});

test('should delete address', () => {
  const placeIdToDelete = wrapper.state('points')[0].pointId;
  wrapper.find('PointList').prop('deletePoint')(placeIdToDelete);
  expect(wrapper.state('points').length).toEqual(0);
});

test('should set error message and render it correctly', () => {
  wrapper.find('AddPoint').prop('handleError')('Test error message');
  expect(wrapper.state('errorMessage')).toBe('Test error message');
  expect(wrapper).toMatchSnapshot();
});

test('should throw an error for trying to add points on the same place', () => {
  wrapper.find('AddPoint').prop('handleAddPoint')('another test name');
  expect(wrapper.state('points').length).toEqual(1);
  expect(wrapper.state('errorMessage')).toEqual('There is a point on this place already');
});