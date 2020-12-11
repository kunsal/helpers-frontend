import React from 'react';
import Home from '../components/Home';
import { shallow } from 'enzyme';

describe('Home', () => {
  it('renders without error', () => {
    shallow(<Home />); 
  });

  describe('Counter', () => {
    it('should contain an increment button', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find('button.increment').length).toEqual(1);
    });
    it('should contain an decrement button', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find('button.decrement').length).toEqual(1);
    });
    it('should display the counter', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find('.countdown').length).toEqual(1);
      expect(wrapper.find('.countdown').text()).toBe("0");
    });
    describe('Increment button', () => {
      it('should increment count when clicked', () => {
        const wrapper = shallow(<Home />);
        wrapper.find('button.increment').simulate('click');
        expect(wrapper.state('count')).toEqual(1);
      });
    })
    describe('Decrement button', () => {
      it('should decrement count when clicked', () => {
        const wrapper = shallow(<Home />);
        wrapper.setState({count: 1});
        wrapper.find('button.decrement').simulate('click');
        expect(wrapper.state('count')).toEqual(0);
      });
      it('should not be a negative value', () => {
        const wrapper = shallow(<Home />);
        wrapper.find('button.decrement').simulate('click');
        expect(wrapper.state('count')).toEqual(0);
      })
    })
  });
});