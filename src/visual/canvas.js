/*
  A canvas essentially represents an individual file. It contains a sequence of
  statements, which are essentially a sequence of nodes. A project may have
  multiple canvases. Additionally, a canvas may export certain objects a la
  module.exports.
*/
const Statement = require('./statement.js');

class Canvas {
  constructor() {
    this.statements = [new Statement()];
    this.values = {
      zoom: 100
    };
    this.mouse = {
      infocus: null
    };
  }

  addNode(index, node) {
    this.statements[index].addNode(node);
    node.canvas = this;
  }

  draw(svg) {
    svg.on('mouseup', () => {
      this.mouse.infocus = null;
    });
    this.statements.forEach(s => s.draw(svg));
  }
}
module.exports = Canvas;
