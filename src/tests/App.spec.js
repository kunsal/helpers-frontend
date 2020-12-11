import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { HashRouter as Router } from 'react-router-dom';

describe('App component', () => {
  it('loads without error', () => {
    shallow(<App />);
  });

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  })
  it('should contain Router component', () => {
    expect(wrapper.contains(Router)).toBeTruthy();
  });
});