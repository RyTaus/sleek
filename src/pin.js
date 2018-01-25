class Pin {
  constructor(pinType) {
    this.type = pinType;
  }

  baseCanConnect(pin) {
    return this.direction !== pin.direction;
  }

  canConnect(pin) {
    return this.baseCanConnect(pin);
  }

  connect(pin) {
    if (this.canConnect(pin)) {
      this.connect = pin;
      pin.connect = this;
    } else {
      console.error('CANNOT CONNECT PIN');
    }
  }

  init(node, direction) {
    this.node = node;
    this.direction = direction;
  }

  getOffsets(node, index) {
    return {
      x: this.node.transform.x + (this.direction === Pin.Direction.IN ? 10 : 100 - 20),
      y: this.node.transform.y + 10 + (20 * index)
    };
  }
}

class PinInput extends Pin {
  constructor() {
    super(Pin.Type.INPUT);
  }

  canConnect(pin) {
    return this.direction === Pin.Direction.IN && pin.type === Pin.Type.Value;
  }

  draw(svg, node, index) {
    const offset = this.getOffsets(node, index);
    svg.append('foreignObject')
      .attr('x', offset.x)
      .attr('y', offset.y)
      .attr('width', 10)
      .attr('height', 10)
      .classed('pin', true)
      .classed('input', true)
      .append('div')
      .attr('type', 'text')
      .text('THIS IS TEST')
      .classed('pin', true)
      .classed('input', true)
      .append('xhtml:div');
  }

  setValue(value) {
    this.value = value;
  }

  compile() {
    return this.value;
  }
}

class PinFlow extends Pin {
  constructor() {
    super(Pin.Type.FLOW);
  }

  canConnect(pin) {
    return this.baseCanConnect(pin) && pin.type === Pin.Type.Flow;
  }

  draw(svg, node, index) {
    const offset = this.getOffsets(node, index);
    const makePolyString = () => {
      const pair = (x, y) => `${offset.x + x},${offset.y + y}`;

      const start = pair(0, 0);
      return `${start} ${pair(10, 5)} ${pair(0, 10)} ${start}`;
    };
    svg.append('polygon')
      .attr('points', makePolyString())
      .classed('pin', true)
      .classed('flow', true);
  }
}

class PinValue extends Pin {
  constructor() {
    super(Pin.Type.VAL);
  }

  canConnect(pin) {
    return this.baseCanConnect(pin) && this.type === Pin.Direction.IN ?
      pin.type === Pin.Type.VAL :
      [Pin.Type.VAL, Pin.Type.INPUT].includes(pin.type);
  }

  draw(svg, node, index) {
    const offset = this.getOffsets(node, index);
    svg.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('x', offset.x)
      .attr('y', offset.y)
      .classed('pin', true)
      .classed('val', true);
  }

  compile() {
    // TODO might need to know the type
    return (this.direction === Pin.Direction.IN) ? this.connect.compile() : this.node.compile();
  }
}

Pin.Type = {
  VAL: 'val',
  FLOW: 'flow',
  INPUT: 'input'
};

Pin.Direction = {
  IN: 'in',
  OUT: 'out'
};

module.exports = {
  Pin,
  Flow: PinFlow,
  Value: PinValue,
  Input: PinInput
};
