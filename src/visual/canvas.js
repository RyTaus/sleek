/*
  A canvas essentially represents an individual file. It contains a sequence of
  statements, which are essentially a sequence of nodes. A project may have
  multiple canvases. Additionally, a canvas may export certain objects a la
  module.exports.
*/
const d3 = require('d3');
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

  setFocus(component, event) {
    if (this.mouse.event === Canvas.event.editText) {
      d3.select('svg').selectAll(`#${this.mouse.infocus.id}_border`)
        .classed('infocus', false);
    }
    this.mouse.infocus = component;
    this.mouse.event = event;
  }

  render() {
    this.svg
      .on('mouseup', () => {
        this.setFocus();
      });
    d3.select('body').on('keydown', () => {
      if (this.mouse.event === Canvas.event.editText) {
        this.mouse.infocus.processInput(d3.event);
      }
    });
    this.statements.forEach(s => s.render());
  }
}

Canvas.event = {
  dragPin: 'dragPin',
  dragNode: 'dragNode',
  editText: 'editText'
};
module.exports = Canvas;
