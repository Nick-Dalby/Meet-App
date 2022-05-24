import React, { Component } from 'react'

export class NumberOfEvents extends Component {

  handleChange = (event) => {
    this.props.handleEventNumberChange(event.target.value);
  }

  render() {
    return (
      <div className='numberOfEvents'>
          <input
          className="number-of-events-input"
          type="number"
          value={this.props.numberOfEvents}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default NumberOfEvents
