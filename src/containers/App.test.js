import React from 'react';
import { shallow } from 'enzyme';
// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import store from "../../store";

configure({ adapter: new Adapter() });

import App from './App';

describe('App', () => {
  const app = shallow(<Provider store={store}><App /></Provider>);
  it('renders the title', () => {
    expect(app).toMatchSnapshot();
  });
});