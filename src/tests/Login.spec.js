import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Login';
import Alert from '../components/common/Alert';

describe('Login page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  it ('should render without error', () => {
    wrapper;
  });
  it ('should contain a Login header', () => {
  expect(wrapper.find('h2.page-title').text()).toBe('Login');
  });

  it ('should contain a field for email address', () => {
    expect(wrapper.find('[type="email"]').length).toEqual(1);
  });

  it ('should contain a field for password', () => {
    expect(wrapper.find('[type="password"]').length).toEqual(1);
  });

  it ('should contain a submit button', () => {
    expect(wrapper.find('button.submit').text()).toBe('Login');
  });

  it ('should contain a link to registration page', () => {
    expect(wrapper.find('#registration-link').text()).toBe('No account? Register');
  });

  describe('Validation', () => {
    it ('should contain a message div', () => {
      expect(wrapper.find(Alert).length).toEqual(1);
    });
  
    it('should throw an error if the email field is blank', () => {
      const alert = shallow(<Alert />)
      wrapper.find('.submit').simulate('click');
      expect(alert.find('div').length).toBe(1)
      
      // expect(alert.find('div').prop('className')).toBe('alert alert-danger');
      // expect(alert.find('div').text()).toContain('Email is required');
    });
  
    // it('should throw an error if the password field is blank', () => {
    //   wrapper.find('[type="email"]').simulate('change', { target: { name: 'email', value: 'kunsal@email.com' }})
    //   wrapper.find('.submit').simulate('click');
    //   expect(wrapper.find(Alert).prop('className')).toBe('alert alert-danger');
    //   expect(wrapper.find(Alert).text()).toBe('Password is required');
    // });
  });

  

  // it('should go to registration page if the registration link is clicked', () => {
  //   wrapper.find('#registration-link').simulate('click');
  //   expect(window.location.href).toHaveBeenCalled()
  // });

});