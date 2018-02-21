const Component = require('./component.js');
const d3 = require('d3');
const ViewPin = require('./view-pin.js');


class ViewNode extends Component {
  constructor(node, svg) {
    super(svg);
    this.node = node;

    this.svgNode = this.svg.append('rect').attr('id', `${this.id}`);
    this.label = this.svg.append('text').classed('label', true).attr('id', `${this.id}_label`);

    this.inPins = this.node.inPins.map((p, i) => new ViewPin[p.type](p, i, svg));
    this.outPins = this.node.outPins.map((p, i) => new ViewPin[p.type](p, i, svg));


    this.initialize();
    this.render();
  }

  initialize() {
    const { node } = this;

    this.svgNode
      .attr('width', 100)
      .attr('height', 20 + (Math.max(node.inPins.length, node.outPins.length) * 15))
      .classed('node', true)
      .call(d3.drag()
        .on('start', () => {
          console.log(this.node);
          // node.canvas.mouse.infocus = this;
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
      .attr('x', node.x + 50)
      .attr('y', node.y + 10);


    this.inPins.forEach(pin => pin.render());
    this.outPins.forEach(pin => pin.render());
  }
}

module.exports = ViewNode;
