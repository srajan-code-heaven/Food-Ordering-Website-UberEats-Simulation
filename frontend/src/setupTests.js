/* eslint-disable import/no-extraneous-dependencies */

import Enzyme from 'enzyme';
// import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// configure({ adapter: new Adapter() });

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// use adapter
Enzyme.configure({ adapter: new Adapter() });

// import '@testing-library/jest-dom';
