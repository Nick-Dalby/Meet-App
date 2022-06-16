import React, { Component } from 'react'
import { ErrorAlert } from './Alert'

export class NumberOfEvents extends Component {
  state = {
    errorText: '',
  }

  handleChange = (event) => {
    const value = event.target.value

    if (value <= 0 || value > 32) {
      this.setState({
        errorText: 'choose between 1 and 32',
      })
    } else {
      this.props.handleEventNumberChange(value)
      return this.setState({
        errorText: '',
      })
    }
  }

  render() {
    return (
      <>
        <div className="numberOfEvents">
          <input
            className="number-of-events-input"
            type="number"
            value={this.props.numberOfEvents}
            onChange={this.handleChange}
          />
        </div>

        <ErrorAlert text={this.state.errorText} />
      </>
    )
  }
}

export default NumberOfEvents
