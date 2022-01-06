/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

describe('Should render Dashboard Component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Dashboard />);
  });

  it('Should render Dashboard Component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
