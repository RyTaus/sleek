/*
  A canvas essentially represents an individual file. It contains a sequence of
  statements, which are essentially a sequence of nodes. A project may have
  multiple canvases. Additionally, a canvas may export certain objects a la
  module.exports.
*/
const Statement = require('./statement.js');

class Canvas {
  constructor(svg) {
    this.statements = [new Statement(svg, this)];
    this.values = {
      zoom: 100
    };
    this.mouse = {
      infocus: null
    };
    this.svg = svg;
  }

  addNode(index, node) {
    this.statements[index].addNode(node);
  }

  render() {
    this.svg.on('mouseup', () => {
      console.log('test');
      this.mouse.infocus = null;
    });
    this.statements.forEach(s => s.render());
  }
}
module.exports = Canvas;
