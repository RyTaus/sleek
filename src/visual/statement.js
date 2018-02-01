class Statement {
  constructor(svg, canvas) {
    this.nodes = [];
    this.svg = svg;
    this.canvas = canvas;
  }

  addNode(node) {
    node.canvas = this.canvas;
    this.nodes.push(node);
  }

  render() {
    this.nodes.forEach(n => n.render());
  }
}

module.exports = Statement;
