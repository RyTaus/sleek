import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Direction from './../utils/direction';
import PinType from './../utils/pin-type';
import Size from './../utils/sizes';

import DropDownInput from './common/dropdown-input';


class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: props.connections,
    };
    this.pinType = props.pinType;
    this.type = props.type;
    this.direction = props.direction;

    this.maxConnections = this.direction === Direction.in ? 1 : Infinity;
    if (this.pinType === PinType.flow) {
      this.maxConnections = this.direction === Direction.in ? Infinity : 1;
    }
  }

  init(node, direction, name, key) {
    this.direction = direction;
    this.node = node;
    this.props.name = name;
    this.props.key = key;
    return this;
  }

  canConnect(pin) {
    return (
      this.pinType === pin.pinType &&
      this.direction !== pin.direction &&
      !this.state.connections.includes(pin) &&
      this.type.equals(pin.type)
    );
  }

  removeConnection(pin) {
    const { connections } = this.state;
    this.setState({
      connections: connections.splice(connections.indexOf(pin), 1),
    });
    return this;
  }

  createConnection(pin) {
    const { connections } = this.state;
    connections.push(pin);
    this.setState({
      connections,
    });
    return this;
  }

  /*  RENDER LOGIC */
  getPosition() {
    return {
      x: this.direction === Direction.in ? Size.Pin.border : Size.Node.width - Size.Pin.width,
      y: Size.Node.topLabel + (Size.Pin.perPin * this.props.key),
    };
  }

  render() {
    const { x, y } = this.getPosition();

    return (
      <rect
        x={x}
        y={y}
        width={Size.Pin.width}
        height={Size.Pin.width}
      />
    );
  }
}

class ValuePin extends Pin {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, y } = this.getPosition();

    return (
      <g>
        <rect
          className="pin"
          x={x}
          y={y}
          width={10}
          height={10}
        />
        <text
          x={x + (this.direction === Direction.in ? Size.Pin.width * 2.5 : -Size.Pin.width * 1.5)}
          y={y + (Size.Pin.width / 2)}
        >
          {this.props.name}
        </text>
      </g>
    );
  }
}

// options
class DropDownPin extends Pin {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, y } = this.getPosition();

    return (
      <g>
        <DropDownInput
          className="pin"
          x={x}
          y={y}
          options={['this', 'is', 'test']}
          height={10}
        />
        <text
          x={x + (this.direction === Direction.in ? Size.Pin.width * 2.5 : -Size.Pin.width * 1.5)}
          y={y + (Size.Pin.width / 2)}
        >
          {this.props.name}
        </text>
      </g>
    );
  }
}


Pin.defaultProps = {
  x: 0,
  y: 0,
  key: 0,
  name: 'pin',
  connections: [],
};

Pin.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  key: PropTypes.number,
  name: PropTypes.string,
  connections: PropTypes.arrayOf(PropTypes.number),
};


export default { Pin, ValuePin, DropDownPin };
