import React, { Component } from 'react'

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null
  }

getStyle = () => {
  return {
    color: this.color,
    marginTop: this.margin
  }
}

  render() {
    return (
      <div className='Alert'>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    )
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue'
    this.margin = '2rem'
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red'
    this.margin = '2rem'

  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange'
  }
}

export { InfoAlert, ErrorAlert, WarningAlert }