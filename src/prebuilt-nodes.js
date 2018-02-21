const Node = require('./model/node.js');
const Pin = require('./model/pin.js');

class Set extends Node {
  constructor(x, y) {
    super('SET', [new Pin.Flow(), new Pin.Input(), new Pin.Value()], [new Pin.Flow()], x, y);
    this.inPins[1].setValue('0');
  }

  compile() {
    return `${this.inPins[1].compile()} = ${this.inPins[2].compile()}`;
  }
}

class Get extends Node {
  constructor(x, y) {
    super('GET', [new Pin.Input()], [new Pin.Value()], x, y);
  }

  compile() {
    return `${this.inPins[0].compile()}`;
  }
}


class PrimNumber extends Node {
  constructor(x, y) {
    super('NUMBER', [new Pin.Input()], [new Pin.Value()], x, y);
    this.inPins[0].setValue('0');
  }
  compile() {
    return `(${this.inPins[0].compile()})`;
  }
}

class Add extends Node {
  constructor(x, y) {
    const next = new Pin.Flow();
    super('ADD', [new Pin.Flow(), new Pin.Value(), new Pin.Value()], [next, new Pin.Value()], x, y);
  }

  compile() {
    return `(${this.inPins[1].compile()} + ${this.inPins[2].compile()})`;
  }
}

class Multiply extends Node {
  constructor(x, y) {
    const next = new Pin.Flow();
    super('MULTIPLY', [new Pin.Flow(), new Pin.Value(), new Pin.Value()], [next, new Pin.Value()], x, y);
  }

  compile() {
    return `(${this.inPins[1].compile()} * ${this.inPins[2].compile()})`;
  }
}

class Start extends Node {
  constructor(x, y) {
    const next = new Pin.Flow();
    super('START', [], [next], x, y);
  }

  compile() {
    return `\n`;
  }
}


module.exports = {
  Start, Set, Get, PrimNumber, Add, Multiply
};
