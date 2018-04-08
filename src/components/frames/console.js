import React, { Component } from 'react';

class Console extends Component {
  constructor(props) {
    super(props);
    this.name = 'console';
  }

  render() {
    return (
      <div className="console" style={{ height: this.props.height }}>
        Console
      </div>
    );
  }
}


export default Console;
