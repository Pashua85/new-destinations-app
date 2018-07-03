import React from 'react';
import { shallow } from 'enzyme';
import MapComponent from '../../components/MapComponent';
import points from '../utils/points';
import pathCoords from '../utils/pathCoords';


test('should render MapComponent correctly', () => {
  const wrapper = shallow(
    <MapComponent points={points} pathCoords={pathCoords} />
  );
  expect(wrapper).toMatchSnapshot();
});