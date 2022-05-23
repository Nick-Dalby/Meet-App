import React, { Component } from 'react'

export class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  }

  handleChange = (event) => {
    this.setState({ numberOfEvents: event.target.value })
  }

  render() {
    return (
      <div>
          <input
          className="number-of-events-input"
          type="number"
          value={this.state.numberOfEvents}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default NumberOfEvents
