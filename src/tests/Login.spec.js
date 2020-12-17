import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../components/Login';

describe('Login page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  it ('should render without error', () => {
    wrapper;
  });
  it ('should contain a Login header', () => {
    expect(wrapper.find('h1.page-title').text()).toBe('Login');
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
    expect(wrapper.find('a#registration-link').text()).toBe('Already has an account? Login');
  });

  it ('should contain a message div', () => {
    expect(wrapper.find('.alert').length).toEqual(1);
  });

  it('should throw an error if the email field is blank', async () => {
    wrapper.find('.submit').simulate('click');
    // expect(await wrapper.find('.alert')).toHaveAttribute('class', 'alert alert-danger');
    expect(wrapper.find('.alert').text()).toBe('Email is required');
  });


});