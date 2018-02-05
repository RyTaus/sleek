const Node = require('./visual/node.js');
const Pin = require('./visual/pin.js');


class PrimNumber extends Node {
  constructor(x, y, svg) {
    super('Number', x, y, svg, [new Pin.Input(Pin.Input.type.number)], [new Pin.Value()], null);
  }
  compile() {
    return `${this.inPins[0].compile()}`;
  }
}

class Add extends Node {
  constructor(x, y, svg) {
    const next = new Pin.Flow();
    super('ADD', x, y, svg, [new Pin.Flow(), new Pin.Value(), new Pin.Value()], [next, new Pin.Value()], next);
  }

  compile() {
    return `${this.inPins[1].compile()} + ${this.inPins[2].compile()}`;
  }
}

class Multiply extends Node {
  constructor(x, y, svg) {
    const next = new Pin.Flow();
    super('MULTIPLY', x, y, svg, [new Pin.Flow(), new Pin.Value(), new Pin.Value()], [next, new Pin.Value()], next);
  }

  compile() {
    return `${this.inPins[1].compile()} * ${this.inPins[2].compile()}`;
  }
}


module.exports = { PrimNumber, Add, Multiply };
