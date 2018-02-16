const Component = require('./component.js');
const d3 = require('d3');

// in pins keep track of edges
class Pin extends Component {
  constructor(pinType) {
    super();
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

  createConnection(pin) {
    if (this.direction === Pin.Direction.IN) {
      if (this.connection) {
        this.connection.connection.splice(this.connection.connection.indexOf(this), 1);
      }
      this.update('connection', pin);
    } else {
      if (this.type === Pin.Type.FLOW) {
        console.log(this.connection);
        if (this.connection[0]) {
          this.connection[0].update('connection', null);
        }
        this.connection[0] = pin;
      } else {
        this.connection.push(pin); 
      }
      this.update('connection', this.connection);
    }
  }

  connect(pin) {
    if (this.baseCanConnect(pin) && this.canConnect(pin) && pin.canConnect(this)) {
      this.createConnection(pin);
      pin.createConnection(this);

      return this;
    }
    throw new Error('Cannot Connect Pins');
  }

  init(node, direction, index) {
    this.node = node;
    this.direction = direction;
    if (this.direction === Pin.Direction.OUT) {
      this.connection = [];
    }
    this.index = index;
    this.svg = node.svg;
    if (this.type === Pin.Type.INPUT) {
      this.createSvgNodeInput();
    } else {
      this.createSvgNode(Pin.Type.toTag[this.type]);
    }
  }

  getOffsets() {
    return {
      x: this.node.transform.x + (this.direction === Pin.Direction.IN ? 10 : 100 - 20),
      y: this.node.transform.y + 15 + (15 * this.index)
    };
  }

  baseRender(d3Node) {
    /* Magic strings cant be gotten from canvas file. Maybe make new File For enum like things? */
    d3Node
      .on('mouseenter', () => {
        this.node.canvas.lastElementOver = this;
        this.getNode().classed('hovered', true);
      })
      .on('mouseleave', () => {
        this.node.canvas.lastElementOver = null;
        this.getNode().classed('hovered', false);
      })
      .call(d3.drag()
        .on('start', () => {
          // console.log(Canvas);

          this.node.canvas.setFocus(this, 'dragPin');
          // this.node.canvas.setFocus(this, Canvas.event.dragPin);
          d3.select('svg').append('line')
            .classed('drawingline', true)
            .attr('x1', this.getOffsets().x)
            .attr('y1', this.getOffsets().y)
            .attr('x2', this.getOffsets().x)
            .attr('y2', this.getOffsets().y);
        })
        .on('drag', () => {
          d3.select('.drawingline')
            .attr('x1', this.getOffsets().x)
            .attr('y1', this.getOffsets().y)
            .attr('x2', d3.mouse(this.svg.node())[0])
            .attr('y2', d3.mouse(this.svg.node())[1]);
        })
        .on('end', () => {
          d3.select('.drawingline').remove();
          if (this.node.canvas.mouse.infocus &&
          this.node.canvas.mouse.event === 'dragPin') {
            this.connect(this.node.canvas.getUnderMouse());
            this.node.canvas.setFocus();
          }
        })
      );
    d3.selectAll(`#edge${this.id}`).remove();
    if (this.connection) {
      if (this.direction === Pin.Direction.IN) {
        this.svg.append('polygon')
          .attr('points', `${this.getOffsets().x},${this.getOffsets().y} ${this.connection.getOffsets().x},${this.connection.getOffsets().y}`)
          .classed('line', true)
          .classed('flow', this.type === Pin.Type.FLOW)
          .attr('id', `edge${this.id}`);
      }
    }
  }

  compile() {
    return this.node.compile();
  }
}

class PinInput extends Pin {
  constructor(inputType) {
    super(Pin.Type.INPUT);
    this.inputType = inputType;
  }

  processInput(event) {
    const prevValue = String(this.value);
    if (this.inputType === PinInput.type.number) {
      if ('01234567890'.includes(event.key)) {
        this.update('value', prevValue + (d3.event.key));
      } else if (event.keyCode === 8) {
        this.update('value', prevValue.slice(0, -1));
      } else if (event.key === '-' && prevValue.length === 0) {
        this.update('value', prevValue + (d3.event.key));
      } else if (event.key === '.' && !prevValue.includes('.') && prevValue.length > 0) {
        this.update('value', prevValue + (d3.event.key));
      }
    }
  }

  canConnect(pin) {
    if (this.direction === Pin.Direction.IN && pin.type === Pin.Type.Value) {
      return true;
    }
    throw Pin.Error.type(this, pin);
  }

  render() {
    const self = this;
    const offset = this.getOffsets(this.node, this.index);
    const node = this.getNode()
      .data([{ pin: this, offset }])
      .attr('x', d => d.offset.x)
      .attr('y', d => d.offset.y + 10)
      .attr('width', 10)
      .attr('height', 10)
      .classed('pin', true)
      .classed('input', true)
      .text(d => d.pin.value);


    const bg = this.getNode('border')
      .data([{ pin: this, offset }])
      .attr('x', d => d.offset.x - 2)
      .attr('y', d => d.offset.y - 1)
      .attr('width', 40)
      .attr('height', 12)
      .classed('inputbg', true)
      .attr('id', `${this.id}_border`)
      .on('click', () => {
        node.classed('focus', true);
        self.node.canvas.setFocus(self, 'editText');
        // self.node.canvas.setFocus(self, Canvas.event.editText);
        d3.event.stopPropagation();
        bg.classed('infocus', true);
      });

    this.baseRender(node);
  }

  setValue(value) {
    this.value = value;
  }

  compile() {
    return this.value;
  }
}

PinInput.type = {
  number: 'number',
  string: 'string'
};

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

  render() {
    const offset = this.getOffsets(this.node, this.index);
    const makePolyString = () => {
      const pair = (x, y) => `${offset.x + x},${offset.y + y}`;

      const start = pair(0, 0);
      return `${start} ${pair(10, 5)} ${pair(0, 10)} ${start}`;
    };

    const node = this.getNode()
      .data([makePolyString()])
      .attr('points', d => d)
      .classed('pin', true)
      .classed('flow', true);

    this.baseRender(node);
  }
}

class PinValue extends Pin {
  constructor() {
    super(Pin.Type.VAL);
  }

  canConnect(pin) {
    if (this.type === Pin.Direction.IN ?
      pin.type === Pin.Type.VAL :
      [Pin.Type.VAL, Pin.Type.INPUT].includes(pin.type)) {
      return true;
    }
    throw Pin.Error.type(this, pin);
  }

  render() {
    const node = this.getNode()
      .data([this.getOffsets(this.node, this.index)])
      .attr('width', 10)
      .attr('height', 10)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .classed('pin', true)
      .classed('val', true);

    this.baseRender(node);
  }

  compile() {
    // TODO might need to know the type
    return (this.direction === Pin.Direction.IN) ? this.connection.compile() : this.node.compile();
  }
}

Pin.Type = {
  VAL: 'val',
  FLOW: 'flow',
  INPUT: 'input',
  toTag: {
    val: 'rect',
    flow: 'polygon',
    input: 'text'
  }
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
