class Pin {
  constructor(pinType) {
    this.type = pinType;
  }

  baseCanConnect(pin) {
    if (this.direction !== pin.direction) {
      return true;
    }
    throw Pin.Error.direction(this, pin);
  }

  canConnect(pin) {
    return this.baseCanConnect(pin);
  }

  connect(pin) {
    if (this.baseCanConnect(pin) && this.canConnect(pin) && pin.canConnect(this)) {
      this.connection = pin;
      pin.connection = this;
      return this;
    }
    throw new Error('Cannot Connect Pins');
  }

  init(node, direction, index) {
    this.node = node;
    this.direction = direction;
    this.index = index;
  }

  getOffsets() {
    return {
      x: this.node.transform.x + (this.direction === Pin.Direction.IN ? 10 : 100 - 20),
      y: this.node.transform.y + 10 + (20 * this.index)
    };
  }

  baseDraw(d3Node, svg) {
    const self = this;
    d3Node
      .on('mousedown', () => {
        console.log(this.node);
        this.node.canvas.mouse.infocus = self;
      })
      .on('mouseup', () => {
        console.log(this.node);
        if (this.node.canvas.mouse.infocus) {
          this.connect(this.node.canvas.mouse.infocus);
        }
      });

    if (this.connection) {
      console.log(this.connection);
      svg.append('polygon')
        .attr('points', `${this.getOffsets().x},${this.getOffsets().y} ${this.connection.getOffsets().x},${this.connection.getOffsets().y}`)
        .classed('line', true);
    }
  }
}

class PinInput extends Pin {
  constructor() {
    super(Pin.Type.INPUT);
  }

  canConnect(pin) {
    if (this.direction === Pin.Direction.IN && pin.type === Pin.Type.Value) {
      return true;
    }
    throw Pin.Error.type(this, pin);
  }

  draw(svg, node) {
    const offset = this.getOffsets(node, this.index);
    this.baseDraw(
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
        .append('xhtml:div'), svg
    );
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
    if (pin.type === Pin.Type.FLOW) {
      return true;
    }
    throw Pin.Error.type(this, pin);
  }

  draw(svg, node) {
    const offset = this.getOffsets(node, this.index);
    const makePolyString = () => {
      const pair = (x, y) => `${offset.x + x},${offset.y + y}`;

      const start = pair(0, 0);
      return `${start} ${pair(10, 5)} ${pair(0, 10)} ${start}`;
    };

    this.baseDraw(
      svg.append('polygon')
        .attr('points', makePolyString())
        .classed('pin', true)
        .classed('flow', true), svg
    );
  }
}

class PinValue extends Pin {
  constructor() {
    super(Pin.Type.VAL);
  }

  canConnect(pin) {
    if (this.type === Pin.Direction.IN ? pin.type === Pin.Type.VAL : [Pin.Type.VAL, Pin.Type.INPUT].includes(pin.type)) {
      return true;
    }
    throw Pin.Error.type(this, pin);
  }

  draw(svg, node) {
    const offset = this.getOffsets(node, this.index);
    this.baseDraw(
      svg.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', offset.x)
        .attr('y', offset.y)
        .classed('pin', true)
        .classed('val', true), svg
    );
  }

  compile() {
    // TODO might need to know the type
    return (this.direction === Pin.Direction.IN) ? this.connection.compile() : this.node.compile();
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

Pin.Error = {
  type: (a, b) => new Error(`cannot match pin types ${a.type}:${a.direction} with ${b.type}:${b.direction}`),
  direction: (a, b) => new Error(`cannot match pin directions ${a.direction} and ${b.direction}`)
};

module.exports = {
  Pin,
  Flow: PinFlow,
  Value: PinValue,
  Input: PinInput
};
