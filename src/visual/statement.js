const { Start } = require('./../prebuilt-nodes.js');

class Statement {
  constructor(svg, canvas) {
    this.start = new Start(svg);
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
    let result = '';
    let curr = this.start;
    const nodeStack = [];
    while (curr) {
      console.log(curr);
      console.log(curr.next);
      console.log(curr.next.connection[0]);
      nodeStack.push(curr);
      // result += curr.compile();
      curr = curr.getNextPin();
    }


    return nodeStack[nodeStack.length - 1].compile();
  }

  render() {
    this.nodes.forEach(n => n.render());
  }
}

module.exports = Statement;
