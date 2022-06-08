import React, { Component } from 'react'

import './App.css'
import './nprogress.css'

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
    warningText: '',
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

  // async componentDidMount() {
  //   this.mounted = true

  //   const accessToken = localStorage.getItem('access_token');
  //   const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  //   const searchParams = new URLSearchParams(window.location.search); 
  //   const code = searchParams.get("code");
  //   this.setState({ showWelcomeScreen: !(code || isTokenValid) });
  //   if ((code || isTokenValid) && this.mounted) {
  //     getEvents().then((events) => {
  //       if (this.mounted) {
  //         this.setState({ events, locations: extractLocations(events) })
  //       }
  //     })
  //   }


  //   if (!navigator.onLine) {
  //     this.setState({
  //       warningText: 'You are offline - displaying cached event data',
  //     })
  //   } else {
  //     this.setState({ warningText: '' })
  //   }
  // }

  componentDidMount() {
    this.mounted = true
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) })
      }
    })

    if (!navigator.onLine) {
      this.setState({ warningText: 'You are offline - displaying cached event data' })
    } else {
      this.setState({ warningText: '' })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    // if (this.state.showWelcomeScreen === undefined)
    //   return <div className="App" />

    return (
      <div className="App">
        <div className="search-number-inputs">
          <WarningAlert text={this.state.warningText} />
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            numberOfEvents={this.state.numberOfEvents}
            handleEventNumberChange={this.handleEventNumberChange}
          />
        </div>
        <EventList
          events={this.state.events.slice(0, this.state.numberOfEvents)}
        />
        {/* <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken()
          }}
        /> */}
      </div>
    )
  }
}

export default App