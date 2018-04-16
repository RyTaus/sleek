import React from 'react';

import Direction from './../utils/direction';
import PinType from './../utils/pin-type';
import Size from './../utils/sizes';

export default class Pin {
  constructor(name, type, direction, index) {
    this.name = name;
    this.type = type;
    this.direction = direction;
    this.index = index;
    this.connections = [];
    this.value = '';
  }

  getPosition() {
    return {
      x: this.node.x + (this.direction === Direction.in ?
        Size.Pin.border :
        Size.Node.width - Size.Pin.width - Size.Pin.border),
      y: this.node.y + Size.Node.topLabel + (Size.Pin.perPin * this.index),
    };
  }

  init(node) {
    this.node = node;

    this.maxConnections = this.direction === Direction.in ? 1 : Infinity;
    if (this.pinType === PinType.flow) {
      this.maxConnections = this.direction === Direction.in ? Infinity : 1;
    }

    return this;
  }

  isConnected() {
    return this.connections.length !== 0;
  }

  canConnect(pin) {
    console.log(this.direction, pin.direction);
    if (
      this.connections.length < this.maxConnections
      && pin.connections.length < pin.maxConnections
      && this.direction !== pin.direction
      && !this.connections.includes(pin)
      && this.type.equals(pin.type)
    ) {
      return true;
    } else if (this === pin) {
      return false;
    }

    throw 'cannot connect';
  }

  renderConnections() {
    const { x, y } = this.getPosition();
    // const { pin: pinModel } = this.props;
    // if (this.direction === Direction.in) {
    //   return null;
    // }
    return (
      this.connections.map((pin) => {
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

  removeConnection(pin) {
    console.log('----------');
    // const pin = this.connections[index];
    console.log(this.connections);
    console.log(this.connections.filter(p => p !== pin));
    pin.connections = pin.connections.filter(p => p !== this);
    this.connections = this.connections.filter(p => p !== pin);

    return this;
  }

  createConnection(pin) {
    this.connections.push(pin);
    return this;
  }

  compile() {
    if (this.isConnected()) {
      console.log('----------');
      console.log(this.node);
      console.log(this.connections[0].node);
      return this.connections[0].node.compile();
    }
    return this.value;
  }
}
