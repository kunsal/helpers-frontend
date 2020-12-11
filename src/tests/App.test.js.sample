import { render, screen } from '@testing-library/react';
import App from '../App';
import { shallow } from 'enzyme';
import Home from '../components/Home';

it('renders App without crashing', () => {
  shallow(<App />)
});

it('renders a div of class App', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div.App').length).toEqual(1);
})

it('renders Home component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Home).length).toEqual(1);
})

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
