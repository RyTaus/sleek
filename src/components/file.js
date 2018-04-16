import React, { Component } from 'react';
import Frame from './frames/frame';


class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [new Frame({ key: 0, nodes: [] }), new Frame({ key: 0, nodes: [] })],
      active: 0,
    };
  }

  render() {
    return (
      <Frame />
    );
  }
}

export default File;
