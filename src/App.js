import React, { Component } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import './App.css'
import './nprogress.css'

import EventGenre from './EventGenre'
import WelcomeScreen from './WelcomeScreen'
import EventList from './EventList'
import CitySearch from './CitySearch'
import NumberOfEvents from './NumberOfEvents'
import { extractLocations, getEvents, checkToken, getAccessToken } from './api'
import { WarningAlert } from './Alert'

export class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
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
      this.setState({ events: locationEvents })
    })
  }

  getData = () => {
    const { locations, events } = this.state
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length
      const city = location.split(', ').shift()
      return { city, number }
    })
    return data
  }

  async componentDidMount() {
    this.mounted = true

    const accessToken = localStorage.getItem('access_token')
    const isTokenValid = (await checkToken(accessToken)).error ? false : true
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')
    this.setState({ showWelcomeScreen: !(code || isTokenValid) })
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) })
        }
      })
    }
  }

  // componentDidMount() {
  //   this.mounted = true
  //   getEvents().then((events) => {
  //     if (this.mounted) {
  //       this.setState({ events, locations: extractLocations(events) })
  //     }
  //   })
  // }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />

    return (
      <div className="App">
        <h1>Meet-App!</h1>
        <p>Find CareerFoundry meet-ups around the world!<br />
          Pick a city and number of results...
        </p>
        <div className="search-number-inputs">

        {navigator.onLine ? (
          ''
          ) : (
            <WarningAlert text={'Offline: displaying cached event data'} />
          )}

          
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            numberOfEvents={this.state.numberOfEvents}
            handleEventNumberChange={this.handleEventNumberChange}
          />
        </div>
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={300}>
            <ScatterChart margin={{ top: 20, right: 50, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" type="category" name="city" />
              <YAxis dataKey="number" type="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#eb5e28" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList
          events={this.state.events.slice(0, this.state.numberOfEvents)}
        />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken()
          }}
        />
      </div>
    )
  }
}

export default App
