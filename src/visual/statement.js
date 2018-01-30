class Statement {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  draw(svg) {
    this.nodes.forEach(n => n.draw(svg));
  }
}

module.exports = Statement;
