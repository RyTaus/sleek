const d3 = require('d3');

const Event = require('./event.js');
const NodeSearcher = require('./node-searcher.js');
const ViewNode = require('./view-node.js');


class ViewFile {
  constructor(file, svg, sidebar) {
    this.file = file;
    this.svg = svg;
    this.nodes = [];

    this.sidebar = sidebar;
    this.nodeSearcher = new NodeSearcher(this);
    this.camera = {
      x: 0,
      y: 0,
      zoom: 1
    };

    this.currentEvent = {
      event: null,
      component: null
    };

    this.initialize();
  }

  focus(component) {
    if (this.focused) {
      this.focused.svgNode.classed('hovered', false);
    }
    this.focused = component;
    if (this.focused) {
      this.focused.svgNode.classed('hovered', true);
    }

    // this.render();
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

  initializeCanvas() {
    this.svg.call(d3.drag()
      .on('start', () => {
        this.startEvent(this, Event.dragCanvas);
      })
      .on('drag', () => {
        this.camera.x = this.camera.x + (d3.event.dx / this.camera.zoom);
        this.camera.y = this.camera.y + (d3.event.dy / this.camera.zoom);
        this.setCamera();
      })
    ).on('contextmenu', () => {
      this.generateNodeSearcher();
    }).on('mouseenter', () => {
      this.focus();
    }).on('wheel', () => {
      this.camera.zoom += d3.event.deltaY < 0 ? 0.1 : -0.1;
      if (this.camera.zoom > 2) {
        this.camera.zoom = 2;
      } else if (this.camera.zoom < 0.5) {
        this.camera.zoom = 0.5;
      }

      this.setCamera();
    });
    d3.select('body').on('keydown', () => {
      if (this.currentEvent.event === Event.editText) {
        this.currentEvent.component.processInput(d3.event);
      }
    });
    this.nodes.forEach(n => n.initialize());

    // this.nodes.forEach(n => {
    //   n.inPins = n.node.inPins.map((p, i) => new ViewPin[p.pinType](p, i, n));
    //   n.outPins = n.node.outPins.map((p, i) => new ViewPin[p.pinType](p, i, n));
    // })
  }

  generateNodeSearcher(pin) {
    this.nodeSearcher.seed(pin);
    this.nodeSearcher.remove();
    this.startEvent(this.nodeSearcher, Event.nodeSearch);
    const position = d3.mouse(this.svg.node());
    this.nodeSearcher.setPosition(position, d3.mouse(this.svg.select('g').node()));
    this.nodeSearcher.active = true;
    this.nodeSearcher.render();
  }

  setCamera() {
    this.svg.select('g')
      .attr('transform', `scale(${this.camera.zoom}) translate(${this.camera.x},${this.camera.y})`);
  }

  renderCanvas() {
    this.setCamera();
    this.nodes.forEach(n => n.render());
    // this.nodeSearcher.render();
  }

  /* ************* Sidebar ************* */

  initializeSideBar() {
    this.newVarButton = this.sidebar.append('button')
      .text('new var')
      .on('click', () => {
        this.file.addVariable(this.buttonInput.node().value);
        this.renderSideBar();
      });
    this.buttonInput = this.sidebar.append('input')
      .attr('type', 'text');

    this.variables = this.sidebar.append('ul');
    this.variables
      .data(Object.keys(this.file.scope))
      .enter()
      .append('li')
      .text(d => d);
  }

  renderSideBar() {
    d3.selectAll('.variable').remove();
    this.variables.selectAll('.variable')
      .data(Object.keys(this.file.scope))
      .enter()
      .append('li')
      .classed('variable', true)
      .text((d) => {
        console.log(d);
        return d;
      });
  }

  load(file) {
    this.svg.select('g').selectAll('*').remove();
    this.file = file;
    this.nodes = file.nodes.map(n => new ViewNode(n, this));
    this.render();
  }

  initialize() {
    this.initializeCanvas();
    // this.initializeSideBar();
  }

  render() {
    this.renderCanvas();
  }
}


module.exports = ViewFile;
