import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
configure({ adapter: new Adapter() });

import { Home } from './Home';

describe('Home', () => {
  test('is rendered', () => {
 
   const component = render(
    <Router><Home/></Router>
    );
    expect(component)
      .toMatchSnapshot();
  });
});