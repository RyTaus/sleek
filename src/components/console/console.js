import React, { Component } from 'react';

import util from 'util';

import { Log, Err } from './entries';

import './styles.css';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: [],
    };
    this.name = 'console';
  }

  log(str) {
    this.state.output.unshift({ Type: Log, text: str });
    this.props.project.forceUpdate();
  }

  err(str) {
    this.state.output.unshift({ Type: Err, text: str });
    this.props.project.forceUpdate();
  }

  render() {
    return (
      <div className="console" style={{ height: this.props.height }}>
        { this.state.output.map(entry => (<entry.Type text={util.inspect(entry.text)} />))}
      </div>
    );
  }
}


export default Console;
