/*
  A canvas essentially represents an individual file. It contains a sequence of
  statements, which are essentially a sequence of nodes. A project may have
  multiple canvases. Additionally, a canvas may export certain objects a la
  module.exports.
*/
const d3 = require('d3');

const NodeSearcher = require('./node-searcher.js');
const ViewNode = require('./view-node.js');
const { Start } = require('./../prebuilt-nodes.js');


class Canvas {
  constructor(file, svg) {
    this.camera = {
      offset: { x: 0, y: 0 },
      width: 600,
      ratio: 6 / 8

    };
    this.mouse = {
      infocus: null
    };

    this.svg = svg;
    this.sidebar = d3.select('.right');

    this.nodes = [];
    this.addNode(new Start(10, 10));

    this.nodeSearcher = new NodeSearcher(this);

    this.svg
      .on('mouseup', () => {
        this.setFocus();
        console.log('mouse up');
      })
      .on('contextmenu', () => {
        console.log('right click');
        this.generateNodeSearcher();
      });
    d3.select('body').on('keydown', () => {
      if (this.mouse.event === Canvas.event.editText) {
        this.mouse.infocus.processInput(d3.event);
      }
    });

    this.svg.call(d3.drag()
      .on('start', () => {
        this.setFocus(this, Canvas.dragCanvas);
        // console.log(this);
      })
      .on('drag', () => {
        this.camera.offset.x = this.camera.offset.x - d3.event.dx;
        this.camera.offset.y = this.camera.offset.y - d3.event.dy;
        this.setCamera();
      })
      .on('end', () => {
        // console.log(this);
      })
    );
  }

  generateNodeSearcher(pin) {
    // console.log(this.nodeSearcher);
    this.nodeSearcher.seed(pin);
    this.nodeSearcher.remove();
    this.setFocus(this.nodeSearcher, Canvas.event.nodeSearch);
    this.nodeSearcher.setPosition(d3.mouse(this.svg.node()));
    this.nodeSearcher.active = true;
    this.nodeSearcher.render();
  }


  setCamera() {
    this.svg.attr('viewBox', `${this.camera.offset.x} ${this.camera.offset.y} ${this.camera.width} ${this.camera.width * this.camera.ratio}`);
  }

  addNode(node) {
    this.nodes.push(new ViewNode(node, this));
  }

  getUnderMouse() {
    return this.lastElementOver;
  }

  setFocus(component, event) {
    // console.log(event, component);
    if (this.mouse.event === Canvas.event.editText) {
      d3.select('svg').selectAll(`#${this.mouse.infocus.id}_border`)
        .classed('infocus', false);
    }
    if (this.mouse.event === Canvas.event.nodeSearch) {
      this.nodeSearcher.remove();
      this.nodeSearcher.render();
    }
    this.mouse.infocus = component;
    this.mouse.event = event;
  }

  render() {
    // this.svg.selectAll('*').remove();
    this.setCamera();
    this.nodes.forEach(n => n.render());
    this.nodeSearcher.render();
  }

  compile() {
    let result = '/* compiled code */ \n'
    this.nodes.map(n => n.node).filter(n => n.name === 'START').sort((a, b) => a.y - b.y).forEach((node) => {
      let curr = node;
      while (curr.getNextNode()) {
        // console.log(curr);
        curr = curr.getNextNode();
      }
      result += '\n';
      result += curr.compile();
      result += ';';
    });
    return result;
  }
}

Canvas.event = {
  dragPin: 'dragPin',
  dragNode: 'dragNode',
  dragCanvas: 'dragCanvas',
  editText: 'editText',
  nodeSearch: 'nodeSearch'
};

console.log(Canvas);
module.exports = Canvas;
