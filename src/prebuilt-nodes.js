const Node = require('./visual/node.js');
const Pin = require('./visual/pin.js');


class PrimNumber extends Node {
  constructor(x, y, svg) {
    super('NUMBER', x, y, svg, [new Pin.Input(Pin.Input.type.number)], [new Pin.Value()], null);
    this.inPins[0].setValue('0');
  }
  compile() {
    return `(${this.inPins[0].compile()})`;
  }
}

class Add extends Node {
  constructor(x, y, svg) {
    const next = new Pin.Flow();
    super('ADD', x, y, svg, [new Pin.Flow(), new Pin.Value(), new Pin.Value()], [next, new Pin.Value()], next);
  }

  compile() {
    return `(${this.inPins[1].compile()} + ${this.inPins[2].compile()})`;
  }
}

class Multiply extends Node {
  constructor(x, y, svg) {
    const next = new Pin.Flow();
    super('MULTIPLY', x, y, svg, [new Pin.Flow(), new Pin.Value(), new Pin.Value()], [next, new Pin.Value()], next);
  }

  compile() {
    return `(${this.inPins[1].compile()} * ${this.inPins[2].compile()})`;
  }
}

class Start extends Node {
  constructor(x, y, svg) {
    const next = new Pin.Flow();
    super('START', x, y, svg, [], [next], next);
  }

  compile() {
    return `\n`;
  }
}


module.exports = {
  Start, PrimNumber, Add, Multiply
};
