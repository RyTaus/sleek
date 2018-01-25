const { Pin } = require('./pin.js');

class Node {
  constructor(name, value, x, y, inPins, outPins) {
    this.name = name;
    this.value = value;

    this.inPins = inPins;
    this.outPins = outPins;

    this.inPins.forEach(pin => pin.init(this, Pin.Direction.IN), this);
    this.outPins.forEach(pin => pin.init(this, Pin.Direction.OUT), this);

    this.transform = {
      x,
      y,
      width: 100,
      height: 30 + (Math.max(this.inPins.length, this.outPins.length) * 10)
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

    this.inPins.forEach((pin, i) => pin.draw(svg, node, i));
    this.outPins.forEach((pin, i) => pin.draw(svg, node, i));
  }
}

module.exports = Node;
