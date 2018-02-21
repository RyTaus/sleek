class Node {
  constructor(name, inPins = [], outPins = [], x, y) {
    this.name = name;
    this.inPins = inPins.map(pin => pin.initialize(this, 'in'));
    this.outPins = outPins.map(pin => pin.initialize(this, 'out'));

    this.x = x;
    this.y = y;
  }

  /**
  * get the next node to compile.
  */

  getNextNode() {
    const next = this.outPins.filter(p => p.isNext)[0];
    if (next) {
      if (next.connections.length) {
        return next.connections[0].node;
      }
    }
    return null;
  }
}

module.exports = Node;
