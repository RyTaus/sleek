import React, { Component } from 'react';
import Frame from './frames/frame';


class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [new Frame({ key: 0, nodes: [] })],
    };
  }

  render() {
    return (
      <div>
        <Frame nodes={[]} />
      </div>
    );
  }
}

export default File;
