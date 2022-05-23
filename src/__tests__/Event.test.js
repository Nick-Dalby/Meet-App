import React from 'react'
import { shallow } from 'enzyme'

import Event from '../Event'
import { mockData } from '../mock-data'

describe('<Event /> component', () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]}/>);
  });

  // test for existence of an event element
  test('render an event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
})
 
  // testing rendering of event details
  test('render the event date', () => {
    expect(EventWrapper.find('.event-date')).toHaveLength(1);
})


  test('render the event summary', () => {
    expect(EventWrapper.find('.event-summary')).toHaveLength(1);
})


  // check if event details are not visible (collapsed by default)
  test('event details hidden by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true)
  })
  
  // test for existence of a clickable element to show/hide event details (button?)
  test('render the show details clickable element', () => {
    expect(EventWrapper.find('.toggle-event-details')).toHaveLength(1);
})

  // event details are rendered on a click
  test('event details are rendered on click', () => {
    EventWrapper.setState({ collapsed: true })
    EventWrapper.find('.toggle-event-details').simulate('click')
    expect(EventWrapper.state('collapsed')).toBe(false)
  })

  // event details are hidden (collapsed) on a click
  test('event details are hidden on click', () => {
    EventWrapper.setState({ collapsed: false })
    EventWrapper.find('.toggle-event-details').simulate('click')
    expect(EventWrapper.state('collapsed')).toBe(true)
  })

})