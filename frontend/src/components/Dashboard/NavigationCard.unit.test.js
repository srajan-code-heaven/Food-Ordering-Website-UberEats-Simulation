/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import NavigationCard from './NavigationCard';

describe('Should render Navigation Card Component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<NavigationCard />);
  });

  it('Should render Navigation Card Component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.card').exists()).toBe(true);
    expect(wrapper.find('.card-body').exists()).toBe(true);
    expect(wrapper.find('.card-img-top').exists()).toBe(true);
    expect(wrapper.find('.cardCustom').exists()).toBe(true);
  });
});
