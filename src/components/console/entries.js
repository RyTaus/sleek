import React, { Component } from 'react';

// This file handles the styling clicks and etc for logs onto the Console
class Entry extends Component {
  constructor(props) {
    super(props);
    this.name = 'entry';

    this.baseClass = 'console-entry';
    this.className = '';
  }

  render() {
    return (
      <div className={`${this.baseClass} ${this.className}`} >
        {this.props.text}
      </div>
    )
  }
}

export class Log extends Entry {
  constructor(props) {
    super(props);
    this.className ='console-log';
  }
}

export class Err extends Entry {
  constructor(props) {
    super(props);
    this.className = 'console-err';
  }
}
