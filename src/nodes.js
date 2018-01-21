const Snap = require('snapsvg');

const Direction = {
  IN: 'in',
  OUT: 'out'
};

class Pin {
  constructor(node, edge) {
    this.edge = edge;
    this.node = node;
  }

  init(node, direction) {
    this.node = node;
    this.direction = direction;
  }

  draw(svg, node, index) {
    svg.rect(
      this.node.transform.x + (this.direction === Direction.IN ? 10 : 100 - 20),
      this.node.transform.y + 10 + (20 * index),
      10,
      10
    ).addClass('pin');
  }
}

class Edge {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}


class Node {
  constructor(name, value, x, y, inPins, outPins) {
    this.name = name;
    this.value = value;

    this.inPins = inPins;
    this.outPins = outPins;

    this.inPins.forEach(pin => pin.init(this, Direction.IN), this);
    this.outPins.forEach(pin => pin.init(this, Direction.OUT), this);


    this.transform = {
      x,
      y,
      width: 100,
      height: Math.max(this.inPins.length, this.outPins.length) * 50
    };
  }

  draw(svg) {
    const node = svg.rect(this.transform.x, this.transform.y, this.transform.width, this.transform.height).addClass('node');
    this.inPins.forEach((pin, i) => pin.draw(svg, node, i));
    this.outPins.forEach((pin, i) => pin.draw(svg, node, i));
  }
}


module.exports = {
  Node,
  Pin,
  Edge
};
