import React from 'react';
import { shallow } from 'enzyme';
// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import store from "../../../store";

configure({ adapter: new Adapter() });

import Header from './Header';

describe('Header', () => {
  const app = shallow(<Provider store={store}><Header /></Provider>);
  it('renders the title', () => {
    expect(app).toMatchSnapshot();
  });
});