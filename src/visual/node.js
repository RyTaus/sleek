const { Pin } = require('./pin.js');

class Node {
  constructor(name, value, x, y, inPins, outPins) {
    this.name = name;
    this.value = value;

    this.inPins = inPins;
    this.outPins = outPins;

    this.inPins.forEach((pin, i) => pin.init(this, Pin.Direction.IN, i), this);
    this.outPins.forEach((pin, i) => pin.init(this, Pin.Direction.OUT, i), this);

    this.transform = {
      x,
      y,
      width: 100,
      height: 30 + (Math.max(this.inPins.length, this.outPins.length) * 20)
    };
  }

  draw(svg) {
    const node = svg
      .append('rect')
      .attr('width', this.transform.width)
      .attr('height', this.transform.height)
      .attr('x', this.transform.x)
      .attr('y', this.transform.y)
      .classed('node', true)
      .on('click', () => { this.transform.x += 20; });

    const self = this;
    this.inPins.forEach((pin, i) => pin.draw(svg, node, self));
    this.outPins.forEach((pin, i) => pin.draw(svg, node, self));
  }

  // TODO when I compile maybe I need to know which pin I came from.
}

module.exports = Node;
