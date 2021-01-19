import React from 'react';
import { shallow } from 'enzyme';
import Register from '../components/Register';

describe ('Registration', () => {
  let wrapper;
   
  beforeEach(() => {
    wrapper = shallow(<Register />);
  });

  it ('should render without error', () => {
    wrapper;
  });

  it ('should contain a page title', () => {
    expect(wrapper.find('h1.page-title').text()).toBe('Register')
  });

  it ('should contain a message div', () => {
    expect(wrapper.find('.alert').length).toEqual(1);
  });

  describe('Members', () => {
    it ('should contain a firstname field', () => {
      expect(wrapper.find('label[htmlFor="firstName"]').text()).toBe('First Name')
      expect(wrapper.find('input[name="firstName"]').length).toEqual(1)
    });

    it ('should contain a lastname field', () => {
      expect(wrapper.find('label[htmlFor="lastName"]').text()).toBe('Last Name')
      expect(wrapper.find('input[name="lastName"]').length).toEqual(1)
    });

    it ('should contain a email field', () => {
      expect(wrapper.find('label[htmlFor="email"]').text()).toBe('Email Address')
      expect(wrapper.find('input[name="email"]').length).toEqual(1)
    });

    it ('should contain a password field', () => {
      expect(wrapper.find('label[htmlFor="password"]').text()).toBe('Password')
      expect(wrapper.find('input[type="password"][name="password"]').length).toEqual(1)
    });

    it ('should contain a file field', () => {
      expect(wrapper.find('label[htmlFor="government_id"]').text()).toBe('Government Issued ID')
      expect(wrapper.find('input[type="file"]').length).toEqual(1)
      expect(wrapper.find('.image-box').length).toEqual(1);
    });

    it ('should contain a button for submission', () => {
      expect(wrapper.find('button.submit').length).toEqual(1);
      expect(wrapper.find('button.submit').text()).toBe("Submit"); 
    })
    
  })

  describe ('Form validation', () => {
    it ('should display error message if first name has no value when form is submitted', () => {
      wrapper.find('button.submit').simulate('click');
      expect(wrapper.find('.alert').prop('className')).toBe('alert alert-danger');
      expect(wrapper.find('.alert').text()).toContain('First name is required');
    });

    it ('should display error message if last name has no value when form is submitted', () => {
      wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'Olakunle'}})
      wrapper.find('button.submit').simulate('click');
      expect(wrapper.find('.alert').prop('className')).toBe('alert alert-danger');
      expect(wrapper.find('.alert').text()).toContain('Last name is required');
    });

    it ('should display error message if email has no value when form is submitted', () => {
      wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'Olakunle'}})
      wrapper.find('input[name="lastName"]').simulate('change', {target: {name: 'lastName', value: 'Salami'}})
      wrapper.find('button.submit').simulate('click');
      expect(wrapper.find('.alert').prop('className')).toBe('alert alert-danger');
      expect(wrapper.find('.alert').text()).toContain('Email is required');
    });

    it ('should display error message if password has no value when form is submitted', () => {
      wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'Olakunle'}})
      wrapper.find('input[name="lastName"]').simulate('change', {target: {name: 'lastName', value: 'Salami'}})
      wrapper.find('input[name="email"]').simulate('change', {target: {name: 'email', value: 'kunsal@email.com'}})
      wrapper.find('button.submit').simulate('click');
      expect(wrapper.find('.alert').prop('className')).toBe('alert alert-danger');
      expect(wrapper.find('.alert').text()).toContain('Password is required');
    });

    it ('should display error message if image has no value when form is submitted', () => {
      wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'Olakunle'}})
      wrapper.find('input[name="lastName"]').simulate('change', {target: {name: 'lastName', value: 'Salami'}})
      wrapper.find('input[name="email"]').simulate('change', {target: {name: 'email', value: 'kunsal@email.com'}})
      wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'password'}})
      wrapper.find('button.submit').simulate('click');
      expect(wrapper.find('.alert').prop('className')).toBe('alert alert-danger');
      expect(wrapper.find('.alert').text()).toContain('Government issued ID is required');
    });

    it ('should display error message if invalid image format is uploaded', () => {
      wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'Olakunle'}})
      wrapper.find('input[name="lastName"]').simulate('change', {target: {name: 'lastName', value: 'Salami'}})
      wrapper.find('input[name="email"]').simulate('change', {target: {name: 'email', value: 'kunsal@email.com'}})
      wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'password'}})
      wrapper.find('input[type="file"]').simulate('change', {target: {name: 'password', value: 'password'}})
      wrapper.find('button.submit').simulate('click');
      expect(wrapper.find('.alert').prop('className')).toBe('alert alert-danger');
      expect(wrapper.find('.alert').text()).toContain('Government issued ID is required');
    });

  });
  
})