const { Pin } = require('./pin.js');
const Component = require('./component.js');
const d3 = require('d3');

class Node extends Component {
  constructor(name, x, y, svg, inPins, outPins, nextNode) {
    super(svg);
    this.name = name;

    this.next = nextNode;

    this.inPins = inPins;
    this.outPins = outPins;

    this.createSvgNodeNode();

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
        .on('start', (d) => {
          d.canvas.mouse.infocus = d;
        })
        .on('drag', (d) => {
          d.transform.x += d3.event.dx;
          d.transform.y += d3.event.dy;
          d.update();
          d.outPins.forEach((p) => {
            if (p.connection.length) {
              p.connection.forEach(c => c.render());
            }
          });
        })
      );

      const bg = d3.select('svg').selectAll(`#${this.id}_label`)
        .data([this])
        .attr('x', d => d.transform.x + 30)
        .attr('y', d => d.transform.y + 30)
        .classed('label', true)
        .text(d => d.name)


    this.inPins.forEach(pin => pin.render());
    this.outPins.forEach(pin => pin.render());
  }

  /* next returns the next statement to be compiled */
  getNextPin() {
    /*
       right now assumes that the first pin is the next flow pin. Anything that breaks
       that trend needs to be specified. maybe nodes take in another input outside of outPins
       that will say what next is? Actully thats what ill do.
    */
    if (this.next) {
      if (this.next.connection[0]) {
        return this.next.connection[0].node;
      }
    }
    return null;
  }

  // TODO when I compile maybe I need to know which pin I came from.
}

module.exports = Node;
