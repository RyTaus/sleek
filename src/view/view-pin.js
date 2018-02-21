const Component = require('./component.js');
const d3 = require('d3');

class ViewPin extends Component {
  constructor(pin, index, svg) {
    super(svg);
    this.pin = pin;
    pin.view = this;
    this.index = index;
    // this.connections = [];
  }

  getPosition() {
    return {
      x: this.pin.node.x + (this.pin.direction === 'in' ? 10 : 100 - 20),
      y: this.pin.node.y + 15 + (15 * this.index)
    };
  }

  initialize() {
    const { pin } = this;
    const { node } = pin;
    this.svgNode
      .classed('pin', true)
      .on('mouseenter', () => {
        node.canvas.lastElementOver = this;
        this.svgNode.classed('hovered', true);
      })
      .on('mouseleave', () => {
        node.canvas.lastElementOver = null;
        this.svgNode.classed('hovered', false);
      })
      .call(d3.drag()
        .on('start', () => {
          node.canvas.setFocus(pin, 'dragPin');
          console.log('canvas: ', node.canvas);
          d3.select('svg').append('line').classed('drawingline', true);
        })
        .on('drag', () => {
          const position = this.getPosition();
          d3.select('.drawingline')
            .attr('x1', position.x)
            .attr('y1', position.y)
            .attr('x2', d3.mouse(this.svg.node())[0])
            .attr('y2', d3.mouse(this.svg.node())[1]);
        })
        .on('end', () => {
          d3.select('.drawingline').remove();
          if (node.canvas.mouse.infocus && node.canvas.mouse.event === 'dragPin') {
            const otherPin = node.canvas.getUnderMouse().pin;
            console.log('To Connect  ', pin, otherPin);
            pin.connect(otherPin);
            node.canvas.setFocus();
            this.render();
            otherPin.view.render();
          }
        })
      );
  }

  render() {
    const { pin } = this;

    if (pin.connections.length > 0 && pin.direction === 'in') {
      d3.selectAll(`#edge${this.id}`).remove();

      const start = this.getPosition();
      const end = pin.connections[0].view.getPosition();
      console.log(pin.connections[0]);

      this.svg.append('line')
        .attr('id', `edge${this.id}`)
        .classed('line', true)
        .classed(pin.pinType, true)
        .attr('x1', start.x)
        .attr('y1', start.y)
        .attr('x2', end.x)
        .attr('y2', end.y);
    }
  }
}

class ViewPinFlow extends ViewPin {
  constructor(pin, index, svg) {
    super(pin, index, svg);
    this.svgNode = this.svg.append('polygon').attr('id', this.id).classed('flow', true);
    this.initialize();
  }

  // initialize() {
  //   super.initialize();
  // }

  render() {
    super.render();
    const position = this.getPosition();
    const makePolyString = () => {
      const pair = (x, y) => `${position.x + x},${position.y + y}`;

      const start = pair(0, 0);
      return `${start} ${pair(10, 5)} ${pair(0, 10)} ${start}`;
    };

    this.svgNode
      .attr('points', makePolyString());
  }
}

class ViewPinVal extends ViewPin {
  constructor(pin, index, svg) {
    super(pin, index, svg);
    this.svgNode = this.svg.append('rect').attr('id', this.id).classed('val', true);
    this.initialize();
  }

  initialize() {
    super.initialize();
    this.svgNode
      .attr('width', 10)
      .attr('height', 10);
  }


  render() {
    super.render();
    const position = this.getPosition();
    this.svgNode
      .attr('x', position.x)
      .attr('y', position.y);
  }
}

class ViewPinInput extends ViewPin {
  constructor(pin, index, svg) {
    super(pin, index, svg);
    this.svgNode = this.svg.append('rect').classed('inputbg', true).attr('id', `${this.id}_border`);
    this.text = this.svg.append('text').attr('id', `${this.id}_text`);

    this.initialize();
  }

  initialize() {
    super.initialize();
    const { node } = this.pin;
    this.svgNode
      .attr('width', 40)
      .attr('height', 12)
      .on('click', () => {
        console.log(this);
        this.svgNode.classed('focus', true);
        node.canvas.setFocus(this, 'editText');
        d3.event.stopPropagation();
      });
  }

  render() {
    super.render();
    const position = this.getPosition();

    this.svgNode
      .attr('x', position.x)
      .attr('y', position.y);

    this.text
      .attr('x', position.x)
      .attr('y', position.y + 10)
      .text(this.pin.value);
  }
}
// const self = this;
// const offset = this.getOffsets(this.node, this.index);
// const node = this.getNode()
//   .attr('x', d => d.offset.x)
//   .attr('y', d => d.offset.y + 10)
//   .text(d => d.pin.value);
//
//
// const bg = this.getNode('border')
//   .data([{ pin: this, offset }])
//   .attr('x', d => d.offset.x - 2)
//   .attr('y', d => d.offset.y - 1)
//   .attr('width', 40)
//   .attr('height', 12)
//   .classed('inputbg', true)
//   .attr('id', `${this.id}_border`)
//   .on('click', () => {
//     node.classed('focus', true);
//     self.node.canvas.setFocus(self, 'editText');
//     // self.node.canvas.setFocus(self, Canvas.event.editText);
//     d3.event.stopPropagation();
//     bg.classed('infocus', true);
//   });

module.exports = {
  pin: ViewPin,
  flow: ViewPinFlow,
  value: ViewPinVal,
  input: ViewPinInput
};
