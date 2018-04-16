import Direction from './../utils/direction';

export default class Node {
  constructor(x, y, inPins, outPins, compile) {
    this.x = x;
    this.inPins = inPins;
    this.outPins = outPins;
    this.compileString = compile;
  }

  compile() {
    let str = this.props.compile;
    Object.keys(this.inPins).forEach((key, i) => {
      str = str.replace(new RegExp(`{i${i}}`, 'g'), this.inPins[key].compile());
    });
    Object.keys(this.outPins).forEach((key, i) => {
      str = str.replace(new RegExp(`{o${i}}`, 'g'), this.outPins[key].compile());
    });
    return str;
  }

  getNextNode() {
    return this.outPins.next;
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
  }
}
