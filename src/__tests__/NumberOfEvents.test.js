import React from 'react'
import { shallow } from 'enzyme'
import NumberOfEvents from '../NumberOfEvents'
import { mockData } from '../mock-data'

describe('<NumberOfEvents /> component', () => {

test('render number of input filed component', () => {
  const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  expect(NumberOfEventsWrapper.find('.number-of-events-input')).toHaveLength(1)
})

test('default value of NumberOfEvents element is 32', () => {
  const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32)
})

test('change state of NumberOfEvents element value when input changes', () => {
  const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  const inputChange = { target: {value: 69}}
  NumberOfEventsWrapper.find('.number-of-events-input').simulate('change', inputChange)

  expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(69)
})


})