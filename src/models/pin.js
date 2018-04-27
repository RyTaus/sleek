import React from 'react';

import Direction from './../utils/direction';
import Size from './../utils/sizes';

import { FLOW, INPUT, STRING, EVALUATE } from './../type/type-type';


export default class Pin {
  constructor(name, type, direction, index, prop = null) {
    this.name = name;
    this.type = type;
    this.direction = direction;
    this.index = index;
    this.connections = [];
    this.value = type.defaultValue;
    this.prop = prop;

    this.maxConnections = this.direction === Direction.in ? 1 : Infinity;
    if (this.type.name === FLOW) {
      this.maxConnections = this.direction === Direction.in ? Infinity : 1;
    }
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
    if (this.type.name === FLOW) {
      this.maxConnections = this.direction === Direction.in ? Infinity : 1;
    }

    return this;
  }

  isConnected() {
    return this.connections.length !== 0;
  }

  canConnect(pin) {
    if (
      this.connections.length < this.maxConnections
      && pin.connections.length < pin.maxConnections
      && this.direction !== pin.direction
      && !this.connections.includes(pin)
      && this.getType().isCompatible(pin.getType())
    ) {
      return true;
    } else if (this === pin) {
      return false;
    }

    throw `cannot connect: ${this.toString()} to ${pin.toString()}`;
  }

  renderConnections() {
    const { x, y } = this.getPosition();
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
          stroke={pin.getType().color}
        />);
      })
    );
  }

  getType() {
    if (this.type.name === INPUT) {
      if (!this.isConnected()) {
        return this.type;
      }
      return this.connections[0].getType();
    } else if (this.type.name === EVALUATE) {
      return this.type.variable.type;
    }
    return this.type.getType(this.node);
  }

  removeConnection(pin) {
    pin.connections = pin.connections.filter(p => p !== this);
    this.connections = this.connections.filter(p => p !== pin);

    return this;
  }

  removeAllConnections() {
    while (this.connections.length > 0) {
      const pin = this.connections[0];
      pin.connections = pin.connections.filter(p => p !== this);
      this.connections = this.connections.filter(p => p !== pin);
    }

    return this;
  }

  createConnection(pin) {
    if (this.node.name === 'call' && this.name === 'function') {
      const script = pin.node.innerScript;
      const { inputs, outputs } = script;
      Object.keys(inputs).forEach((key, i) => {
        const param = inputs[key];
        this.node.inPins[key] = (new Pin(param.name, param.type, 'in', i + 1)).init(this.node);
      });

      Object.keys(outputs).forEach((key, i) => {
        const param = outputs[key];
        this.node.outPins[key] = (new Pin(param.name, param.type, 'out', i, param.name)).init(this.node);
      });
    }
    this.connections.push(pin);
    return this;
  }

  generateFromValue() {
    if (this.value === null) {
      throw `${this.toString()} has no value!!`;
    }
    return this.getType().name === STRING ? `"${this.value}"` : this.value;
  }

  generate() {
    if (this.prop) {
      return `${this.node.generate()}.${this.prop}`;
    }

    if (this.type.name === FLOW) {
      if (this.direction === Direction.in) {
        return this.node.generateAll();
      }
      if (this.isConnected()) {
        return this.connections[0].generate();
      }
      return '';
    }

    if (this.type.name === EVALUATE) {
      return this.type.generate();
    }

    if (this.direction === Direction.in) {
      if (this.isConnected()) {
        return this.connections[0].generate();
      }
      return this.generateFromValue();
    }


    return this.node.generate();
  }

  toString() {
    return `${this.name}{ ${this.node.name}, ${this.direction}, ${this.type.toString()} }`;
  }
}
