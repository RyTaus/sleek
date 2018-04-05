import React, { Component } from 'react';
import Frame from './frames/frame';


class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [new Frame({ nodes: [] })],
    };
  }

  render() {
    return (
      <div>
        {this.state.frames.map(frame => frame.render())}

      </div>
    );
  }
}

export default File;
