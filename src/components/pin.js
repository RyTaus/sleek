import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Direction from './../utils/direction';
import PinType from './../utils/pin-type';
import Size from './../utils/sizes';
import { Type } from './../type/type';


class Pin extends Component {
  constructor(props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /*  RENDER LOGIC */
  getPosition() {
    return {
      x: this.props.x + (this.props.pin.direction === Direction.in ?
        Size.Pin.border :
        Size.Node.width - Size.Pin.width - Size.Pin.border),
      y: this.props.y + Size.Node.topLabel + (Size.Pin.perPin * this.props.index),
    };
  }

  onMouseUp(evt) {
    window.eventHandler.onPinUp(evt, this);
  }

  onChange(evt) {
    if (this.props.pin.type.name === 'Number') {
      if (/^-?\d*\.?\d*$/.test(evt.target.value)) {
        this.props.pin.value = evt.target.value;
      }
    } else {
      this.props.pin.value = evt.target.value;
    }
    window.frame.forceUpdate();
    return true;
  }

  onMouseDown(evt) {
    window.eventHandler.onPinDown(evt, this);
  }

  onContextMenu(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const { pin } = this.props;
    console.log(pin);
    // pin.removeConnection(0);

    while (pin.isConnected()) {
      pin.removeConnection(pin.connections[0]);
    }
  }

  // Since they are offset by a g they need nodes x
  renderConnections() {
    const { x, y } = this.getPosition();
    const { pin: pinModel } = this.props;
    if (pinModel.direction === Direction.in) {
      return null;
    }
    return (
      pinModel.connections.map((pin) => {
        const other = pin.getPosition();
        const offset = (Size.Pin.width / 2);
        return (<line
          className={`${this.pinType}-line`}
          x1={x + offset}
          y1={y + offset}
          x2={other.x + offset}
          y2={other.y + offset}
          strokeWidth="4"
          stroke={pin.type.color}
        />);
      })
    );
  }

  renderFlow() {
    const { x, y } = this.getPosition();
    const { pin } = this.props;

    return (
      <polygon
        className={`pin flow ${pin.isConnected() ? 'connected' : ''}`}
        points={`${x},${y} ${x + Size.Pin.width},${y + (Size.Pin.width / 2)} ${x},${y + Size.Pin.width}`}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onContextMenu={this.onContextMenu}
      />
    );
  }

  renderLine() {
    const offset = (Size.Pin.width / 2);
    const { x, y } = this.getPosition();
    return (<line
      className="line"
      x1={x + offset}
      y1={y + offset}
      x2={window.eventHandler.x + offset}
      y2={window.eventHandler.y + offset}
      strokeWidth="4"
      stroke={this.props.pin.type.color}
    />);
  }

  renderPin() {
    if (this.props.pin.type.name === 'Flow') {
      return this.renderFlow();
    }
    return this.renderValue();
  }

  renderLabel() {
    const { x, y } = this.getPosition();
    const inOffsetFactor = this.props.pin.isConnected() ? 2 : 3;
    return (
      <text
        x={x + (this.props.pin.direction === Direction.in ? Size.Pin.width * inOffsetFactor : -Size.Pin.width)}
        y={y + (Size.Pin.width * 0.75)}
        textAnchor={this.props.pin.direction === Direction.in ? 'start' : 'end'}
      >
        {this.props.pin.name}
      </text>
    );
  }

  renderInput() {
    const { x, y } = this.getPosition();
    const { pin } = this.props;

    if (pin.type.name === 'Number' || pin.type.name === 'String') {
      return (
        <foreignObject x={x} y={y} width="50" height="20" style={{ position: 'fixed' }} >
          <input
            className="pin"
            type="text"
            onMouseUp={this.onMouseUp}
            onChange={this.onChange}
            size={1.5}
            style={{ 'border-color': pin.type.color }}
            value={pin.value}
          />
        </foreignObject>
      );
    } else if (pin.type.name === 'Boolean') {
      return (
        <foreignObject x={x} y={y} width="60" height="20">
          <input
            className="pin checkbox check-input"
            type="checkbox"
            onMouseUp={this.onMouseUp}
            onChange={((evt) => {pin.value = evt.target.checked; window.frame.forceUpdate();}).bind(this)}
            style={{ margin: 0, zoom: 1.8, outline: pin.type.color }}
            checked={pin.value}
          />
        </foreignObject>
      );
    }

    return null;
  }

  renderValue() {
    const { pin } = this.props;
    if (!pin.isConnected() && pin.direction === Direction.in) {
      return this.renderInput();
    }
    const { x, y } = this.getPosition();
    return (
      <g>
        <rect
          className={`pin ${pin.connections.length ? 'connected' : ''}`}
          x={x}
          y={y}
          style={{ stroke: pin.type.color }}
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
