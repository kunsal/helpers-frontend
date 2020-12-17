import React from 'react';
import Home from '../components/Home';
import { shallow } from 'enzyme';

describe('Home component', () => {
  it('should render without error', () => {
    shallow(<Home />);
  });
});