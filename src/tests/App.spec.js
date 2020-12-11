import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

describe('App component', () => {
  it('loads without error', () => {
    shallow(<App />);
  });

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  })
  it('should contain Router component', () => {
    expect(wrapper.find(Router)).toBeTruthy();
  });

  it('should contain Switch component', () => {
    expect(wrapper.find(Switch).length).toBe(1);
  })

  it('should contain at least one Route component', () => {
    expect(wrapper.find(Route).length).toBeGreaterThan(0);
  })
});