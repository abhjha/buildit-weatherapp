import React from 'react';
import App from './App';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import fetchMock from 'fetch-mock';


it('renders without crashing', () => {
  shallow(<App />);
});

it('All 3 input boxes rendered', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.input-container input')).to.have.length(3);
});

it('No suggestions found on page load`', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.suggestion-box')).to.have.length(0);
});

it('No results shown on page load', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.weather-details .tile-box')).to.have.length(0);
});

it("Entering Value in location name is successful", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().locationName).equal('');
  wrapper.find('.location-input').simulate('blur', { target: { value: 'Delhi', className: 'location-input' } });
  expect(wrapper.state().locationName).equal('Delhi');
});

it("Suggestion feature is working fine", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().suggestions.length).equal(0);
  expect(wrapper.find('.suggestion-box').exists()).to.equal(false);
  wrapper.find('.location-input').simulate('blur', { target: { value: 'Trussville', className: 'location-input' } });
  expect(wrapper.state().suggestions.length).equal(1);
  expect(wrapper.find('.suggestion-box').exists()).to.equal(true);
});
