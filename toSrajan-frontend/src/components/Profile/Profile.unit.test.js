/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Profile from './Profile';
import reducers from '../../state/reducers/index';

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);

describe('Should render Profile component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('Should render Profile component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
