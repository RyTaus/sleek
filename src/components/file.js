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
      <div>
        <Frame />
        <button onClick={() => {
          this.setState({
            active: (this.state.active + 1) % this.state.frames.length,
          });
          this.forceUpdate();
        }}> swap </button>
      </div>
    );
  }
}

export default File;
