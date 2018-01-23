const Node = require('./node.js');
const Pin = require('./pin.js');


class PrimNumber extends Node {
  constructor(x, y) {
    super('Number', '', x, y, [new Pin(Pin.Type.INPUT)], [new Pin(Pin.Type.VAL)]);
  }

  compile() {
    return `${this.inPins[0].compile()}`;
  }
}

class Add extends Node {
  constructor(x, y) {
    super('ADD', '', x, y, [new Pin(true), new Pin(), new Pin()], [new Pin(true), new Pin()]);
  }

  compile() {
    return `${this.inPins[1].compile()} + ${this.inPins[2].compile()}`;
  }
}


module.exports = { PrimNumber, Add };
