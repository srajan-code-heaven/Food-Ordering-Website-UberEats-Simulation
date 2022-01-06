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
import SignUp from './SignIn';
import reducers from '../../state/reducers/index';

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);

describe('Should render sign up component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('Should render sign up component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
