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

  get

  compile() {
    this.nodes[0].compile()
  }

  render() {
    this.nodes.forEach(n => n.render());
  }
}

module.exports = Statement;
