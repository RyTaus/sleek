const { Pin } = require('./pin.js');
const Component = require('./component.js');
const d3 = require('d3');

class Node {
  constructor(name, x, y, svg, inPins, outPins, nextNode) {
    this.name = name;

    this.next = nextNode;

    this.inPins = inPins;
    this.outPins = outPins;

    this.inPins.forEach((pin, i) => pin.init(this, Pin.Direction.IN, i));
    this.outPins.forEach((pin, i) => pin.init(this, Pin.Direction.OUT, i));

    this.x = x;
    this.y = y;
  }


  /* next returns the next statement to be compiled */
  getNextPin() {
    /*
       right now assumes that the first pin is the next flow pin. Anything that breaks
       that trend needs to be specified. maybe nodes take in another input outside of outPins
       that will say what next is? Actully thats what ill do.
    */
    if (this.next) {
      if (this.next.connections[0]) {
        return this.next.connections[0].node;
      }
    }
    return null;
  }

  // TODO when I compile maybe I need to know which pin I came from.
}

module.exports = Node;
