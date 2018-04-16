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

  compile() {
    let str = this.compileString;
    console.log(this.inPins['a'].compile());
    // str = str.replace(new RegExp(`{i${0}}`, 'g'), this.inPins['a'].connections[0].compile());
    Object.keys(this.inPins).forEach((key, i) => {
      const replacement = this.inPins[key].compile();
      str = str.replace(new RegExp(`{i${i}}`, 'g'), replacement);
    });
    // Object.keys(this.outPins).forEach((key, i) => {
    //   str = str.replace(new RegExp(`{o${i}}`, 'g'), this.outPins[key].compile());
    // });
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
    return this;
  }
}
