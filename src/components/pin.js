import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Direction from './../utils/direction';
import PinType from './../utils/pin-type';
import Size from './../utils/sizes';
import Type from './../type/type';

import DropDownInput from './common/dropdown-input';


class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: props.connections || [],
    };
    this.pinType = props.pinType;
    this.type = props.type || new Type.Type('nil');
    this.direction = props.direction;


    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  init(node, direction, name, key) {
    this.direction = direction;
    this.node = node;
    this.eventHandler = node.eventHandler;
    this.props.name = name;
    this.props.key = key;

    this.maxConnections = this.direction === Direction.in ? 1 : Infinity;
    if (this.pinType === PinType.flow) {
      this.maxConnections = this.direction === Direction.in ? Infinity : 1;
    }

    return this;
  }

  canConnect(pin) {
    if (
      this.pinType === pin.pinType
      && this.state.connections.length < this.maxConnections
      && pin.state.connections.length < pin.maxConnections
      && this.direction !== pin.direction
      && !this.state.connections.includes(pin)
      && this.type.equals(pin.type)
    ) {
      return true;
    }

    throw 'cannot connect';
  }

  removeConnection(pin) {
    const { connections } = this.state;
    const other = connections[connections.indexOf(pin)];
    other.setState({
      connections: other.state.connections.splice(other.state.connections.indexOf(this), 1),
    });
    this.setState({
      connections: connections.splice(connections.indexOf(pin), 1),
    });
    this.node.forceUpdate();
    other.node.forceUpdate();
    return this;
  }

  createConnection(pin) {
    const { connections } = this.state;
    connections.push(pin);
    this.setState({
      connections,
    });
    this.node.forceUpdate();
    return this;
  }

  /*  RENDER LOGIC */
  getPosition() {
    return {
      x: this.node.state.x + (this.direction === Direction.in ?
        Size.Pin.border :
        Size.Node.width - Size.Pin.width - Size.Pin.border),
      y: this.node.state.y + Size.Node.topLabel + (Size.Pin.perPin * this.props.key),
    };
  }

  onMouseUp(evt) {
    this.eventHandler.onPinUp(evt, this);
  }

  onMouseDown(evt) {
    this.eventHandler.onPinDown(evt, this);
  }

  onContextMenu(evt) {
    evt.preventDefault();
    while (this.state.connections.length) {
      this.removeConnection(this.state.connections[0]);
    }
  }

  // Since they are offset by a g they need nodes x
  renderConnections() {
    const { x, y } = this.getPosition();
    if (this.direction === Direction.in) {
      return null;
    }
    return (
      this.state.connections.map((pin) => {
        const other = pin.getPosition();
        const offset = (Size.Pin.width / 2);
        return (<line
          className={`${this.pinType}-line`}
          x1={x + offset}
          y1={y + offset}
          x2={other.x + offset}
          y2={other.y + offset}
          strokeWidth="4"
          stroke={this.type.color}
        />);
      })
    );
  }

  render(key) {
    const { x, y } = this.getPosition();
    return (
      <g key={key}>
        <rect
          x={x}
          y={y}
          width={Size.Pin.width}
          height={Size.Pin.width}
        />
        {this.renderConnections()}
      </g>
    );
  }
}

class ValuePin extends Pin {
  constructor(props) {
    super(props);
    this.pinType = 'value';
  }

  render() {
    const { x, y } = this.getPosition();

    return (
      <g>
        <rect
          className={`pin ${this.state.connections.length ? 'connected' : ''}`}
          x={x}
          y={y}
          style={{ stroke: this.props.type.color }}
          width={Size.Pin.width}
          height={Size.Pin.width}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onContextMenu={this.onContextMenu}
        />
        <text
          x={x + (this.direction === Direction.in ? Size.Pin.width * 2.5 : -Size.Pin.width * 2.5)}
          y={y + (Size.Pin.width / 2)}
        >
          {this.props.name}
        </text>
        {this.renderConnections()}
      </g>
    );
  }
}

class FlowPin extends Pin {
  constructor(props) {
    super(props);
    this.pinType = 'flow';
    this.type = new Type.Type('flow');
  }

  render() {
    const { x, y } = this.getPosition();
    return (
      <g>
        <polygon
          className={`pin flow ${this.state.connections.length ? 'connected' : ''}`}
          points={`${x},${y} ${x + Size.Pin.width},${y + (Size.Pin.width / 2)} ${x},${y + Size.Pin.width}`}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onContextMenu={this.onContextMenu}
        />
        <text
          x={x + (this.direction === Direction.in ? Size.Pin.width * 2.5 : -Size.Pin.width * 2.5)}
          y={y + (Size.Pin.width / 2)}
        >
          {this.props.name}
        </text>
        {this.renderConnections()}
      </g>
    );
  }
}

// options
class DropDownPin extends Pin {
  constructor(props) {
    super(props);
    this.value = null;
    this.pinType = 'drop-down';
    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.value = newValue;
    console.log(newValue);
  }

  render() {
    const { x, y } = this.getPosition();

    return (
      <g>
        <DropDownInput
          className="pin"
          x={x}
          y={y}
          options={this.props.options}
          height={10}
          onChange={this.onChange}
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
  key: 0,
  name: 'pin',
  connections: [],
  type: new Type.Type('null'),
};

Pin.propTypes = {
  key: PropTypes.number,
  name: PropTypes.string,
  connections: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.instanceOf(Type.Type),
};

ValuePin.defaultProps = Pin.defaultProps;
ValuePin.propTypes = Pin.propTypes;


export default { Pin, ValuePin, DropDownPin, FlowPin };
