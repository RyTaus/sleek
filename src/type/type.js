export const FLOW = 'Flow';
export const NUMBER = 'Number';
export const STRING = 'String';
export const BOOLEAN = 'Boolean';
export const LIST = 'List';
export const LABEL = 'List';
export const MAP = 'Map';
export const STRUCT = 'Struct';
export const FUNC = 'Func';
export const ANY = '*';


export class Type {
  constructor(name, color = 'black') {
    this.name = name;
    this.color = color;
    this.properties = [];
    this.defaultValue = null;
  }

  addProperty(prop) {
    this.properties.push(prop);
  }

  equals(other) {
    return this.toString() === other.toString();
  }

  toString() {
    return this.name;
  }
}

export class Flow extends Type {
  constructor() {
    super(FLOW, 'white');
  }
}

export class StringLit extends Type {
  constructor() {
    super(STRING, 'blue');
    this.defaultValue = '';
  }
}

export class NumLit extends Type {
  constructor() {
    super(NUMBER, 'green');
    this.defaultValue = 0;
  }
}

export class BoolLit extends Type {
  constructor() {
    super(BOOLEAN, 'red');
    this.defaultValue = false;
  }
}

export class Label extends Type {
  constructor() {
    super(LABEL, 'gray');
    this.defaultValue = 'None';
  }
}

export class List extends Type {
  constructor(elementType) {
    super(LIST, elementType.color);
    this.elementType = elementType;
  }

  toString() {
    return `List<${this.elementType.toString()}>`;
  }
}

export class Map extends Type {
  constructor(structName, inType, outType) {
    super(MAP, 'yellow');
    this.inType = inType;
    this.outType = outType;
  }

  toString() {
    return `Map<${this.inType.toString()} : ${this.outType.toString()}}>`;
  }
}

export class Struct extends Type {
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

export class Func extends Type {
  constructor(inputTypeDict, returnType) {
    super(FUNC, 'purple');
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
