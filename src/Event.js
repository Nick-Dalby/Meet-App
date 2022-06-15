import React, { Component } from 'react'

export class Event extends Component {
  state = {
    collapsed: true,
  }

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { event } = this.props

    // format datetime to calendar format
    const date = new Date(event.start.dateTime)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }
    const formattedDate = date.toLocaleString('en-US', options)

    return (
      <div className="event">
        <h3 className="event-summary">{event.summary}</h3>
        <div className='date-location'>
        <h5 className="event-date">{formattedDate}</h5>
        <h5>{event.location}</h5>
        </div>
       {this.state.collapsed ? (
        <button className="toggle-event-details details-btn" onClick={this.handleClick}>
          Show details
        </button>) : (
        <button className="toggle-event-details details-btn" onClick={this.handleClick}>
          Hide details
        </button>)}
        {!this.state.collapsed ? (
          <div className="event-details">
            <p>
              {event.description}
              </p>
              </div>
        ) : null}
      </div>
    )
  }
}

export default Event
