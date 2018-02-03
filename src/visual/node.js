const { Pin } = require('./pin.js');
const Component = require('./component.js');
const d3 = require('d3');

class Node extends Component {
  constructor(name, value, x, y, inPins, outPins, svg) {
    super(svg);
    this.name = name;
    this.value = value;

    this.inPins = inPins;
    this.outPins = outPins;

    this.createSvgNode('rect');

    this.inPins.forEach((pin, i) => pin.init(this, Pin.Direction.IN, i));
    this.outPins.forEach((pin, i) => pin.init(this, Pin.Direction.OUT, i));

    this.transform = {
      x,
      y,
      width: 100,
      height: 30 + (Math.max(this.inPins.length, this.outPins.length) * 20)
    };
  }

  render() {
    this.getNode()
      .data([this])
      .attr('width', d => d.transform.width)
      .attr('height', d => d.transform.height)
      .attr('x', d => d.transform.x)
      .attr('y', d => d.transform.y)
      .classed('node', true)
      .on('click', () => { console.log(this); })
      .call(d3.drag()
        .on('start', () => {
          console.log('dragging');
        })
        .on('drag', (d) => {
          d.transform.x += d3.event.dx;
          d.transform.y += d3.event.dy;
          d.update();
          d.outPins.forEach((p) => {
            if (p.connection) {
              p.connection.render();
            }
          })
          // d3.select(this).attr()
        })
      );

    this.inPins.forEach(pin => pin.render());
    this.outPins.forEach(pin => pin.render());
  }

  // TODO when I compile maybe I need to know which pin I came from.
}

module.exports = Node;
