const { Pin } = require('./pin.js');
const Component = require('./component.js');

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
      .data([this.transform])
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .classed('node', true)
      .on('click', () => {console.log(this);});

    this.inPins.forEach(pin => pin.render());
    this.outPins.forEach(pin => pin.render());
  }

  // TODO when I compile maybe I need to know which pin I came from.
}

module.exports = Node;
