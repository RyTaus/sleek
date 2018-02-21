const { Start } = require('./../prebuilt-nodes.js');
const ViewNode = require('./view-node.js');

class Statement {
  constructor(svg, canvas) {
    this.start = new Start(0, 0, svg);
    this.start.canvas = canvas;
    this.svg = svg;
    this.nodes = [
      new ViewNode(this.start, this.svg)
    ];
    this.canvas = canvas;
  }

  addNode(node) {
    node.canvas = this.canvas;
    this.nodes.push(new ViewNode(node, this.svg));
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
