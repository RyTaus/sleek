import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Pin from './pin';


class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
    };
    this.inPins = this.props.inPins;
    this.outPins = this.props.outPins;
  }

  getNextNode() {
    return this.outPins.next;
  }

  render() {
    return (
      <rect
        x={this.state.x}
        y={this.state.y}
        width={100}
        height={Math.max(Object.keys(this.inPins).length, Object.keys(this.outPins).length) * 40}
      />
    );
  }
}

Node.defaultProps = {
  x: 0,
  y: 100,
  // name: 'dd',
  inPins: {},
  outPins: {},
};

Node.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  // name: PropTypes.string,
  inPins: PropTypes.objectOf(PropTypes.instanceOf(Pin)),
  outPins: PropTypes.objectOf(PropTypes.instanceOf(Pin)),
};


export default Node;
