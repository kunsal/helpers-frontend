import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import { HashRouter as Router, Switch } from 'react-router-dom';
import LayoutRoute from '../components/layouts/LayoutRoute';

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
    //wrapper = mount(<App />);
    expect(wrapper.find(LayoutRoute).length).toBeGreaterThan(0);
  })
});