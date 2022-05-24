import React, { Component } from 'react'

import './App.css'
import './nprogress.css'

import EventList from './EventList'
import CitySearch from './CitySearch'
import NumberOfEvents from './NumberOfEvents'
import { extractLocations, getEvents } from './api'

export class App extends Component {
  state = { 
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  handleEventNumberChange = (value) => {
    this.setState({ numberOfEvents: value })
  }


  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location)
      this.setState({ events: locationEvents.slice(0, this.state.numberOfEvents) })
    })
  }

  componentDidMount() {
    this.mounted = true
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) })
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} handleEventNumberChange={this.handleEventNumberChange}/>
        <EventList events={this.state.events.slice(0, this.state.numberOfEvents)}/>
      </div>
    )
  }
}

export default App
