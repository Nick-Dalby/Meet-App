import React, { Component } from 'react'

export class Event extends Component {
  state = {
    collapsed: true,
  }

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {

    const { event } = this.props;

    return (
      <div className='event'>
        <h3 className="event-summary">{event.summary}</h3>
        <h3 className="event-date">{event.start.dateTime}</h3>
        <button className="toggle-event-details" onClick={this.handleClick}>Show/hide details</button>
        {
          !this.state.collapsed ?
          <div className="event-details">more TBD event details go here</div>
          :
          null
        }
      </div>
    )
  }
}

export default Event