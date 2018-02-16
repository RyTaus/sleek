const { Start } = require('./../prebuilt-nodes.js');

class Statement {
  constructor(svg, canvas) {
    this.start = new Start(0, 0, svg);
    this.start.canvas = canvas;
    this.nodes = [
      this.start
    ];
    this.svg = svg;
    this.canvas = canvas;
  }

  addNode(node) {
    node.canvas = this.canvas;
    this.nodes.push(node);
  }

  compile() {
    let curr = this.start;
    while (curr.getNextPin()) {
      curr = curr.getNextPin();
    }
    return curr.compile();
  }

  render() {
    this.nodes.forEach(n => n.render());
  }
}

module.exports = Statement;
