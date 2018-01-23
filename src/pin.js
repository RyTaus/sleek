class Pin {
  constructor(pinType = Pin.Type.VAL, type) {
    this.pinType = pinType;
    this.type = type;
  }

  init(node, direction) {
    this.node = node;
    this.direction = direction;
  }

  draw(svg, node, index) {
    const xOffset = this.node.transform.x + (this.direction === Pin.Direction.IN ? 10 : 100 - 20);
    const yOffset = this.node.transform.y + 10 + (20 * index);
    if (this.pinType === Pin.Type.FLOW) {
      const makePolyString = () => {
        const pair = (x, y) => `${xOffset + x},${yOffset + y}`;

        const start = pair(0, 0);
        return `${start} ${pair(10, 5)} ${pair(0, 10)} ${start}`;
      };
      svg.append('polygon')
        .attr('points', makePolyString())
        .classed('pin', true)
        .classed('flow', true);
    } else if (this.pinType === Pin.Type.VAL) {
      svg.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', xOffset)
        .attr('y', yOffset)
        .classed('pin', true)
        .classed('val', true);
    } else if (this.pinType === Pin.Type.INPUT) {
      svg.append('foreignObject')
        .attr('x', xOffset)
        .attr('y', yOffset)
        .attr('width', 10)
        .attr('height', 10)
        .classed('pin', true)
        .classed('input', true)
        .append('div')
        .attr('type', 'text')
        .text('THIS IS TEST')
        .classed('pin', true)
        .classed('input', true)
        .append('xhtml:div');
    }
  }
}

class PinValue extends Pin{
  constructor() {
    this.pinType = Pin.Type.VAL;
  }
}

Pin.Type = {
  VAL: 'val',
  FLOW: 'flow',
  INPUT: 'input'
};

Pin.Direction = {
  IN: 'in',
  OUT: 'out'
};

module.exports = Pin;
