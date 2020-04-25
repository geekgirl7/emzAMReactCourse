import React from 'react';
import { shallow, configure } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';

test('should render LoadingPage correctly', () => {
  const wrapper = shallow(<LoadingPage/>);
  expect(wrapper).toMatchSnapshot();
});