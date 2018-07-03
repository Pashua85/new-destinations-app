import React from 'react';
import { shallow } from 'enzyme';
import PointListItem from '../../components/PointListItem';
import points from '../utils/points';

test('should render PointListItem with static data', () => {
  const wrapper = shallow(<PointListItem item={points[0]} />);
  expect(wrapper).toMatchSnapshot();
});