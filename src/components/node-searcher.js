import React, { Component } from 'react';

import Size from './../utils/sizes';


class NodeSearcher extends Component {
  constructor(props) {
    super(props);
    this.name = 'node-searcher';
  }

  render() {
    if (!this.props.active) {
      return null;
    }

    return (
      <rect
        x={this.props.x}
        y={this.props.y}
        width={Size.NodeSearcher.width}
        height={Size.NodeSearcher.height}
      />
    );
  }
}

export default NodeSearcher;
