import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Pin from './pin';
import Direction from './../utils/direction';
import Size from './../utils/sizes';


class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
    };

    this.coords = {
      x: 0,
      y: 0,
    };
    this.inPins = this.props.inPins;
    this.outPins = this.props.outPins;
    this.eventHandler = props.eventHandler;

    this.init();

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  getNextNode() {
    return this.outPins.next;
  }

  setEventHandler(handler) {
    this.eventHandler = handler;
    return this;
  }

  init() {
    Object.keys(this.inPins).forEach((key, i) => {
      const pin = this.inPins[key];
      pin.init(this, Direction.in, key, i);
    });
    Object.keys(this.outPins).forEach((key, i) => {
      const pin = this.outPins[key];
      pin.init(this, Direction.out, key, i);
    });
  }

  handleMouseDown(evt) {
    this.coords = {
      x: evt.pageX,
      y: evt.pageY,
    };
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(evt) {
    const xDiff = this.coords.x - evt.pageX;
    const yDiff = this.coords.y - evt.pageY;

    this.coords.x = evt.pageX;
    this.coords.y = evt.pageY;

    this.setState({
      x: this.state.x - xDiff,
      y: this.state.y - yDiff
    });

    Object.keys(this.inPins).forEach((pin) => {
      console.log(this.inPins[pin].state.connections);
      this.inPins[pin].state.connections.forEach(connection => connection.node.forceUpdate());
    })

    Object.keys(this.outPins).forEach((pin) => {
      console.log(this.outPins[pin].state.connections);
      this.outPins[pin].state.connections.forEach(connection => connection.node.forceUpdate());
    })
  }

  handleMouseUp(evt) {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.coords = {
      x: 0,
      y: 0
    };
  }

  render(key) {
    return (
      <g
        key={key}
      >
        <rect
          className="node"
          x={this.state.x}
          y={this.state.y}
          width={Size.Node.width}
          height={Size.Node.topLabel + (Math.max(Object.keys(this.inPins).length, Object.keys(this.outPins).length) * Size.Pin.perPin)}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          zIndex={100}
        />
        <text
          y={this.state.y + Size.Pin.width}
          x={this.state.x + (Size.Node.width / 2)}
          width={Size.Node.width}

          textAnchor="middle"
          zIndex={3}
        >
          {this.props.name}
        </text>
        {Object.keys(this.inPins).map((k, i) => this.inPins[k].render(i))}
        {Object.keys(this.outPins).map((k, i) => this.outPins[k].render(i))}
      </g>
    );
  }
}

Node.defaultProps = {
  x: 0,
  y: 100,
  name: 'dd',
  inPins: {},
  outPins: {},
};

Node.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  name: PropTypes.string,
  inPins: PropTypes.objectOf(PropTypes.instanceOf(Pin)),
  outPins: PropTypes.objectOf(PropTypes.instanceOf(Pin)),
};


export default Node;
