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
    this.camera = {
      offset: { x: 0, y: 0 },
      width: 600,
      ratio: 6 / 8

    };
    this.mouse = {
      infocus: null
    };

    // const start = new Start(this.svg)

    // this.addNode(0, start);

    this.svg = svg;

    this.svg
      .on('mouseup', () => {
        this.setFocus();
      });
    d3.select('body').on('keydown', () => {
      if (this.mouse.event === Canvas.event.editText) {
        this.mouse.infocus.processInput(d3.event);
      }
    });

    this.svg.call(d3.drag()
      .on('start', () => {
        console.log(this);
      })
      .on('drag', () => {
        this.camera.offset.x = this.camera.offset.x - d3.event.dx;
        this.camera.offset.y = this.camera.offset.y - d3.event.dy;
        this.setCamera();
      })
      .on('end', () => {
        console.log(this);
      })
    );
  }

  setCamera() {
    this.svg.attr('viewBox', `${this.camera.offset.x} ${this.camera.offset.y} ${this.camera.width} ${this.camera.width * this.camera.ratio}`);
  }

  addNode(index, node) {
    this.statements[index].addNode(node);
  }

  getUnderMouse() {
    return this.lastElementOver;
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
    this.setCamera();
    this.statements.forEach(s => s.render());
  }
}

Canvas.event = {
  dragPin: 'dragPin',
  dragNode: 'dragNode',
  editText: 'editText'
};

console.log(Canvas);
module.exports = Canvas;
