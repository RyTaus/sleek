const Component = require('./component.js');
const d3 = require('d3');
const ViewPin = require('./view-pin.js');
const Event = require('./event.js');
const sizes = require('./size.js');


class ViewNode extends Component {
  constructor(node, canvas) {
    super(canvas);
    this.canvas = canvas;
    this.node = node;
    node.view = this;

    this.svgNode = this.svg.select('g').append('rect').attr('id', `${this.id}`);
    this.label = this.svg.select('g').append('text').classed('label', true).attr('id', `${this.id}_label`);

    this.inPins = this.node.inPins.map((p, i) => new ViewPin[p.pinType](p, i, this));
    this.outPins = this.node.outPins.map((p, i) => new ViewPin[p.pinType](p, i, this));


    this.initialize();
    // this.render();
  }

  initialize() {
    super.initialize();
    const { node } = this;
    console.log(sizes.node.heightPerPin);
    this.svgNode
      .attr('width', sizes.node.width)
      .attr('height', sizes.node.labelHeight + (Math.max(node.inPins.length, node.outPins.length) * sizes.node.heightPerPin))
      .classed('node', true)
      .on('mouseout', () => {
        this.canvas.focus();
      })
      .call(d3.drag()
        .on('start', () => {
          this.canvas.startEvent(this, Event.dragNode);
        })
        .on('drag', () => {
          node.x += d3.event.dx;
          node.y += d3.event.dy;
          this.render();
          this.outPins.forEach((p) => {
            if (p.pin.connections.length) {
              p.pin.connections.forEach(c => c.view.render());
            }
          });
        })
      );

    this.label
      .attr('text-anchor', 'middle')
      .text(node.name);
  }

  render() {
    const { node } = this;

    this.svgNode
      .attr('x', node.x)
      .attr('y', node.y);


    this.label
      .attr('x', node.x + (sizes.node.width / 2))
      .attr('y', node.y + 10);


    this.inPins.forEach(pin => pin.render());
    this.outPins.forEach(pin => pin.render());
  }
}

module.exports = ViewNode;
