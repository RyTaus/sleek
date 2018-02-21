const d3 = require('d3');

const Event = require('./event.js');
const NodeSearcher = require('./node-searcher.js');
const ViewNode = require('./view-node.js');
const { Start } = require('./../prebuilt-nodes.js');


class ViewFile {
  constructor(file, svg, sidebar) {
    this.file = file;
    this.svg = svg;
    this.nodes = [];

    this.sidebar = sidebar;
    this.nodeSearcher = new NodeSearcher(this);
    this.camera = {
      x: 0,
      y: 0
    };

    this.currentEvent = {
      event: null,
      component: null
    };

    this.initialize();
  }

  focus(component) {
    this.focused = component;
    this.render();
  }

  /* ************ Events ************ */
  addNode(node) {
    this.nodes.push(new ViewNode(node, this));
    this.file.nodes.push(node);
  }

  startEvent(component, event) {
    if (this.currentEvent.event === Event.nodeSearch) {
      this.nodeSearcher.remove();
    }
    this.currentEvent.event = event;
    this.currentEvent.component = component;
  }

  stopEvent() {
    this.currentEvent.event = null;
    this.currentEvent.component = null;
  }

  hovered() {
    return this.focused;
  }

  /* ************* View ************* */

  initialize() {
    this.svg.call(d3.drag()
      .on('start', () => {
        this.startEvent(this, Event.dragCanvas);
      })
      .on('drag', () => {
        this.camera.x = this.camera.x - d3.event.dx;
        this.camera.y = this.camera.y - d3.event.dy;
        this.setCamera();
      })
    ).on('contextmenu', () => {
      this.generateNodeSearcher();
    }).on('mouseenter', () => {
      this.focus()
    })
    d3.select('body').on('keydown', () => {
      if (this.currentEvent.event === Event.editText) {
        this.currentEvent.component.processInput(d3.event);
      }
    });;
  }

  generateNodeSearcher(pin) {
    // console.log(this.nodeSearcher);
    this.nodeSearcher.seed(pin);
    this.nodeSearcher.remove();
    this.startEvent(this.nodeSearcher, Event.nodeSearch);
    this.nodeSearcher.setPosition(d3.mouse(this.svg.node()));
    this.nodeSearcher.active = true;
    this.nodeSearcher.render();
  }

  setCamera() {
    this.svg
      .attr('transform', `translate(${this.camera.x},${this.camera.y})`);
  }

  renderCanvas() {
    this.setCamera();
    this.nodes.forEach(n => n.render());
    // this.nodeSearcher.render();
  }

  render() {
    this.renderCanvas();
  }

}


module.exports = ViewFile;
