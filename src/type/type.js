import * as Types from './type-type';


export class T {
  constructor(name, color = 'black') {
    this.name = name;
    this.color = color;
    this.defaultValue = null;
  }

  addProperty(prop) {
    this.properties.push(prop);
  }

  equals(other) {
    return this.toString() === other.toString();
  }

  isCompatible(other) {
    if (this.name === Types.INPUT || other.name === Types.INPUT) {
      return true; // Should be more detailed
    }
    return this.equals(other);
  }

  getType() {
    return this;
  }

  toString() {
    return this.name;
  }
}

export class Input extends T {
  constructor(possible) {
    super(Types.INPUT, 'gray');
    this.possible = possible;
  }
}

export class Flow extends T {
  constructor() {
    super(Types.FLOW, 'white');
  }
}

export class StringLit extends T {
  constructor() {
    super(Types.STRING, 'blue');
    this.defaultValue = '';
  }
}

export class NumLit extends T {
  constructor() {
    super(Types.NUMBER, 'green');
    this.defaultValue = 0;
  }
}

export class BoolLit extends T {
  constructor() {
    super(Types.BOOLEAN, 'red');
    this.defaultValue = false;
  }
}

export class Label extends T {
  constructor() {
    super(Types.LABEL, 'gray');
    this.defaultValue = 'None';
  }
}

export class List extends T {
  constructor(elementType) {
    super(Types.LIST, elementType.color);
    this.elementType = elementType;
    this.defaultValue = [];
  }

  toString() {
    return `List<${this.elementType.toString()}>`;
  }
}

export class Map extends T {
  constructor(structName, inType, outType) {
    super(Types.MAP, 'yellow');
    this.keyType = inType;
    this.valType = outType;
  }

  toString() {
    return `Map<${this.inType.toString()} : ${this.outType.toString()}}>`;
  }
}

export class Struct extends T {
  constructor(structName, propDict) {
    super(structName, 'orange');
    this.props = propDict;
  }

  getPropType(propName) {
    return this.props[propName];
  }

  toString() {
    return `${this.name}{${this.props}}`;
  }
}

export class Func extends T {
  constructor(inputTypeDict, returnType) {
    super(Types.FUNC, 'purple');
    this.returnType = returnType;
    this.inputTypeDict = inputTypeDict;
  }

  getInputType(name) {
    return this.inputTypeDict[name];
  }

  toString() {
    return `Function<${this.elementType.toString()}>`;
  }
}

export class Type extends T {
  constructor() {
    super(Types.TYPE, 'skyblue');
    this.defaultValue = new StringLit();
  }

  toString() {
    return this.name;
  }
}

export class Evaluate extends T {
  constructor(variable) {
    super(Types.EVALUATE, 'brown');
    this.variable = variable;
  }

  generate() {
    return this.variable.name;
  }
}

export class Relative extends T {
  // typeFun takes in the relative pin and returns the type
  constructor(pinName, of, value) {
    super(Types.RELATIVE, 'coral');
    this.relativeName = pinName;
    this.type = of;
    this.isValue = value;
    // this.getTypeFun = typeFun;
  }

  getType(node) {
    if (this.isValue) {
      const type = node.inPins[this.relativeName].value;
      if (this.type === Types.LIST_OF) {
        return new List(type);
      }
    }
    if (this.type === Types.SAME) {
      return node.inPins[this.relativeName].getType();
    } else if (this.type === Types.VALUE) {
      return node.inPins[this.relativeName].value;
    } else if (this.type === Types.LIST_OF) {
      return new List(node.inPins[this.relativeName].getType());
    } else if (this.type === Types.INSTANCE) {
      const variable = node.inPins[this.relativeName].value;
      if (variable === 'None') {
        return new T('UNKNOWN', 'black');
      }
      return node.script.getVariable(variable.name).type.getType();
    }
    const type = node.inPins[this.relativeName].getType()[this.type];
    if (!type) {
      return new T('UNKNOWN', 'black');
    }
    return type;
  }
}

// export const of = (Con, isVal) => (pin) => isVal ? new Con(pin.value)

export const nameToType = (data) => {
  const d = data.toUpperCase();
  const mapped = {
    FLOW: Flow,
    NUMBER: NumLit,
    STRING: StringLit,
    BOOLEAN: BoolLit,
  };

  if (d in mapped) {
    return new mapped[d]();
  }
  return null;
};


// module.exports = {
//   Type, Flow, StringLit, NumLit, BoolLit, List, Struct, Func, Map,
// };
