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
    if (this.name === Types.INPUT) {
      return this.possible(other); // Should be more detailed
    } else if (other.name === Types.INPUT) {
      return other.possible(this);
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
    super(Types.STRING, '#61B329');
    this.defaultValue = '';
  }
}

export class NumLit extends T {
  constructor() {
    super(Types.NUMBER, '#EE3B3B');
    this.defaultValue = 0;
  }
}

export class BoolLit extends T {
  constructor() {
    super(Types.BOOLEAN, '#388E8E');
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

export class SetLit extends T {
  constructor(elementType) {
    super(Types.SET, elementType.color);
    this.elementType = elementType;
    this.defaultValue = new Set([]);
  }

  toString() {
    return `Set<${this.elementType.toString()}>`;
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
  constructor(inputs = {}, outputs = {}) {
    super(Types.FUNC, 'purple');
    this.inputs = inputs;
    this.outputs = outputs;
  }

  getInputType(name) {
    return this.inputTypeDict[name];
  }

  toString() {
    return `Function<${this.inputs.toString()} : ${this.outputs.toString()}}>`;
  }
}

export class Type extends T {
  constructor() {
    super(Types.TYPE, 'skyblue');
    this.defaultValue = new BoolLit();
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
      if (this.type === Types.SET_OF) {
        return new SetLit(type);
      }
    }
    if (this.type === 'output') {
      return node.inPins[this.relativeName].connections[0].getType();
    }
    if (this.type === Types.SAME) {
      return node.inPins[this.relativeName].getType();
    } else if (this.type === Types.VALUE) {
      return node.inPins[this.relativeName].value;
    } else if (this.type === Types.LIST_OF) {
      return new List(node.inPins[this.relativeName].getType());
    } else if (this.type === Types.SET_OF) {
      return new SetLit(node.inPins[this.relativeName].getType());
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
