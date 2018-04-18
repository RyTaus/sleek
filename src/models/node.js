import Direction from './../utils/direction';

export default class Node {
  constructor(name, x, y, inPins, outPins, compile) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.inPins = inPins;
    this.outPins = outPins;
    this.compileString = compile;

    this.init();
  }

  generate() {
    let str = this.compileString;
    Object.keys(this.inPins).forEach((key, i) => {
      if (str.includes(`{${key}}`)) {
        const replacement = this.inPins[key].generate();
        str = str.replace(new RegExp(`{${key}}`, 'g'), replacement);
      }
    });
    Object.keys(this.outPins).filter(key => this.outPins[key].type.name === 'Flow').forEach((key, i) => {
      if (this.outPins[key].connections[0]) {
        const replacement = this.outPins[key].connections[0].node.generate();
        str = str.replace(new RegExp(`{${key}}`, 'g'), replacement);
      } else {
        str = str.replace(new RegExp(`{${key}}`, 'g'), '');
      }
    });
    return str;
  }

  remove() {
    Object.keys(this.inPins).forEach((key) => {
      this.inPins[key].removeAllConnections();
    });
    Object.keys(this.outPins).forEach((key) => {
      this.outPins[key].removeAllConnections();
    });
  }

  getNextNode() {
    try {
      return this.outPins.next.connections[0].node;
    } catch (e) {
      return null;
    }
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
