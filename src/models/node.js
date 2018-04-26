import Direction from './../utils/direction';
import Script, { FunctionDeclarationScript } from './script';
import Pin from './pin';
import { FLOW } from './../type/type-type';
import { Flow, Evaluate } from './../type/type';

export default class Node {
  constructor(name, x, y, inPins = {}, outPins = {}, gen, script, declarationType = false) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.inPins = inPins;
    this.outPins = outPins;
    this.generateExpression = () => gen(this);
    // this.declType = declerationType; // Func, Class, or Struct
    this.script = script;

    this.specialize();


    if (declarationType) {
      this.innerScript = new FunctionDeclarationScript('declaration', this.script, this);
    }

    // for generating. Maybe keep in a table??
    this.hasGenerated = false;
    this.label = null;

    this.init();
  }

  specialize() {
    if (this.name === 'start') {
      const outPins = { next: new Pin('next', new Flow(), 'out', 0) };
      const params = this.script.inputs;
      Object.keys(params).forEach((key, i) => {
        const param = params[key];
        outPins[key] = (new Pin(key, new Evaluate(param), 'out', i + 1)).init(this);
      });
      this.outPins = outPins;
      this.init();
    }
    if (this.name === 'return') {
      const inPins = { next: new Pin('', new Flow(), 'in', 0) };
      const results = this.script.outputs;
      Object.keys(results).forEach((key, index) => {
        const variable = results[key];
        inPins[variable.name] = (new Pin(variable.name, variable.type, 'in', index + 1)).init(this);
      });
      this.inPins = inPins;
      this.init();
    }
    if (this.name === 'call') {
      const outPins = {};
      const inPins = {};
      const params = this.script.inputs;
      Object.keys(params).forEach((key, i) => {
        const param = params[key];
        outPins[key] = (new Pin(key, new Evaluate(param), 'out', i)).init(this);
      });
      this.outPins = outPins;
      this.init();
    }
  }

  addPin(variable, pinType = 'in') {
    if (this.name === 'start') {
      const index = Object.keys(this.outPins).length;
      this.outPins[variable.name] = (new Pin(variable.name, new Evaluate(variable), 'out', index)).init(this);
    } else if (this.name === 'return') {
      const index = Object.keys(this.inPins).length;
      this.inPins[variable.name] = (new Pin(variable.name, variable.type, 'in', index)).init(this);
    } else if (this.name === 'call') {
      if (pinType === 'in') {
        const index = Object.keys(this.inPins).length;
        this.inPins[variable.name] = (new Pin(variable.name, variable.type, 'in', index)).init(this);
      } else {
        const index = Object.keys(this.outPins).length;
        this.inPins[variable.name] = (new Pin(variable.name, variable.type, 'out', index, variable.name)).init(this);
      }
    }
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
    let current = this;
    while (current) {
      const result = current.generate();
      this.script.generation.statements.push(result);
      current = current.getNextNode();
    }
  }

  generateAll() {
    let str = '';
    let current = this;
    while (current) {
      const result = current.generate();
      str = str + result;
      current = current.getNextNode();
    }
    return str;
  }

  generate() {
    if (this.label) {
      return this.label;
    }
    if (this.getTotalOutConnections() > 1) {
      const expression = this.generateExpression();
      this.label = this.script.labelGenerator.next().value;
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
