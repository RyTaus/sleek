import Direction from './../utils/direction';
import { FLOW } from './../type/type-type';

export default class Node {
  constructor(name, x, y, inPins, outPins, gen) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.inPins = inPins;
    this.outPins = outPins;
    this.generateExpression = () => gen(this);

    // for generating. Maybe keep in a table??
    this.hasGenerated = false;
    this.label = null;

    this.init();
  }

  remove() {
    Object.keys(this.inPins).forEach((key) => {
      this.inPins[key].removeAllConnections();
    });
    Object.keys(this.outPins).forEach((key) => {
      this.outPins[key].removeAllConnections();
    });
  }

  getPinType(pin) {
    if (pin.type.name.includes('of')) {
      this.getRelativePinType(pin);
    }
    return pin.type;
  }

  getNextNode() {
    try {
      return this.outPins.next.connections[0].node;
    } catch (e) {
      return null;
    }
  }

  generateBlock() {
    let string = '';
    let current = this;
    while (current) {
      string += `${current.generate()};`;
      current = current.getNextNode();
    }
    return string;
  }

  generate() {
    console.log(`node: ${this.name} generate`);
    if (this.label) {
      return this.label;
    }
    if (this.getTotalOutConnections() > 1) {
      const expression = this.generateExpression();
      this.label = window.labelGenerator.next().value;
      return `(${this.label} = ${expression})`;
    }
    return this.generateExpression();
  }

  getTotalOutConnections() {
    let sum = 0;
    Object.keys(this.outPins).forEach((key) => {
      const pin = this.outPins[key];
      if (pin.type.name !== FLOW) {
        sum += pin.connections.length;
      }
    });
    return sum;
  }

  init() {
    Object.keys(this.inPins).forEach((key, i) => {
      const pin = this.inPins[key];
      pin.init(this, Direction.in, key, i);
    });
    Object.keys(this.outPins).forEach((key, i) => {
      const pin = this.outPins[key];
      pin.init(this, Direction.out, key, i);
    });
    return this;
  }
}
