const Node = require('./visual/node.js');
const Pin = require('./visual/pin.js');


class PrimNumber extends Node {
  constructor(x, y) {
    super('Number', '', x, y, [new Pin.Input()], [new Pin.Value()]);
  }

  compile() {
    return `${this.inPins[0].compile()}`;
  }
}

class Add extends Node {
  constructor(x, y) {
    super('ADD', '', x, y, [new Pin.Flow(), new Pin.Value(), new Pin.Value()], [new Pin.Flow(), new Pin.Value()]);
  }

  compile() {
    return `${this.inPins[1].compile()} + ${this.inPins[2].compile()}`;
  }
}


module.exports = { PrimNumber, Add };
