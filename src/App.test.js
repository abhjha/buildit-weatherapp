import React from 'react';
import App from './App';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

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


it("Weather report generated and displayed", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().locationId).equal('');
  expect(wrapper.find('.city-details').exists()).to.equal(false);
  expect(wrapper.find('.tile-box').exists()).to.equal(false);
  wrapper.find('.pincode-input').simulate('blur', { target: { value: 1273294, className: 'pincode-input' } });
  expect(wrapper.state().locationId).equal(1273294);
  wrapper.find('.btn-primary').simulate('click');
  console.log(wrapper.state());
  expect(wrapper.find('.city-details').exists()).to.equal(true);
  expect(wrapper.find('.tile-box').exists()).to.equal(true);
});