import React, { Component } from 'react';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: [],
    };
    this.name = 'console';
  }

  log(str) {
    this.state.output.push(str);
    this.props.project.forceUpdate();
  }

  render() {
    return (
      <div className="console" style={{ height: this.props.height }}>
        {this.state.output.map((str, i) => (<div> {JSON.stringify(str)} </div>))}
      </div>
    );
  }
}


export default Console;
