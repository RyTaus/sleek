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

  /* Some nodes will have specific save functions... ie gets and sets? */
  save() {
    const node = {
      name: this.constructor.name,
      x: Math.floor(this.x),
      y: Math.floor(this.y),
      inPins: []
    };

    this.inPins.forEach((p) => {
      node.inPins.push(p.save());
    });

    return node;
  }
}

module.exports = Node;
