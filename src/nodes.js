const Snap = require('snapsvg');

class Pin {
  constructor(edge, node) {
    this.edge = edge;
    this.node = node;
  }
}

class Edge {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}


class Node {
  constructor(name, value, x, y, width, height) {
    this.name = name;
    this.value = value;

    this.transform = {
      x,
      y,
      width,
      height
    };
  }

  draw(svg) {
    let s = Snap(svg);
    s.rect(this.transform.x, this.transform.y, this.transform.width, this.transform.height);
  }
}


module.exports = Node;
