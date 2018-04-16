import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Direction from './../utils/direction';
import PinType from './../utils/pin-type';
import Size from './../utils/sizes';
import { Type } from './../type/type';


class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: props.connections || [],
      value: '',
    };
    // this.pinType = props.pinType;
    this.type = props.type || new Type('nil');
    this.value = '';
    this.direction = props.direction;

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onChange = this.onChange.bind(this);
    this.compile = this.compile.bind(this);
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

  isConnected() {
    return this.state.connections.length !== 0;
  }

  canConnect(pin) {
    if (
      // this.pinType === pin.pinType
      // &&
      this.state.connections.length < this.maxConnections
      && pin.state.connections.length < pin.maxConnections
      && this.direction !== pin.direction
      && !this.state.connections.includes(pin)
      && this.type.equals(pin.type)
    ) {
      return true;
    } else if (this === pin) {
      return false;
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

  compile() {
    console.log(this);
    if (this.isConnected()) {
      return this.state.connections[0].node.compile();
    }
    return this.value;
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
    console.log('mus');
    this.eventHandler.onPinUp(evt, this);
  }

  onChange(evt) {
    this.value = evt.target.value;
    this.state.value = evt.target.value;
    this.node.forceUpdate();
    // console.log(this.value);
    return true;
  }

  onMouseDown(evt) {
    this.eventHandler.onPinDown(evt, this);
  }

  onContextMenu(evt) {
    evt.preventDefault();
    evt.stopPropagation();
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

  renderFlow() {
    const { x, y } = this.getPosition();

    return (
      <polygon
        className={`pin flow ${this.state.connections.length ? 'connected' : ''}`}
        points={`${x},${y} ${x + Size.Pin.width},${y + (Size.Pin.width / 2)} ${x},${y + Size.Pin.width}`}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onContextMenu={this.onContextMenu}
      />
    );
  }

  renderPin() {
    if (this.type.name === 'Flow') {
      return this.renderFlow();
    }
    return this.renderValue();
  }

  renderLabel() {
    const { x, y } = this.getPosition();
    return (
      <text
        x={x + (this.direction === Direction.in ? Size.Pin.width * 2.5 : -Size.Pin.width * 2.5)}
        y={y + (Size.Pin.width * 0.75)}
      >
        {this.props.name}
      </text>
    );
  }

  renderInput() {
    const { x, y } = this.getPosition();
    if (this.type.name === 'Number' || this.type.name === 'String') {
      return (
        <foreignObject x={x} y={y} >
          <input
            className="pin"
            type="text"
            onMouseUp={this.onMouseUp}
            onChange={this.onChange}
            size="1"
            style={{ 'border-color': this.type.color }}
          />
        </foreignObject>
      );
    } else if (this.type.name === 'Boolean') {
      return (
        <foreignObject x={x} y={y} >
          <input
            className="pin checkbox"
            type="checkbox"
            onMouseUp={this.onMouseUp}
            onChange={((evt) => {this.value = evt.target.checked; console.log(this);}).bind(this)}
            style={{ margin: 0, zoom: 1.8, outline: this.type.color }}

          />
        </foreignObject>
      );
    }
  }

  renderValue(key) {
    if (!this.isConnected() && this.direction === Direction.in) {
      return this.renderInput();
    }
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
      </g>
    );
  }

  render() {
    return (
      <g>
        {this.renderPin()}
        {this.renderLabel()}
        {this.renderConnections()}
      </g>
    );
  }
}

Pin.defaultProps = {
  key: 0,
  name: 'pin',
  connections: [],
  type: new Type('null'),
};

Pin.propTypes = {
  key: PropTypes.number,
  name: PropTypes.string,
  connections: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.instanceOf(Type),
};

export default Pin;
