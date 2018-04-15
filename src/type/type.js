/**
 * Each Type should have the corresponding input type to use.
 * boolean: checkbox
 * number: number
 * string: string
 * map: sidebar
 */
export const FLOW = 'Flow';
export const NUMBER = 'Number';
export const STRING = 'String';
export const BOOLEAN = 'Boolean';
export const LIST = 'List';
export const MAP = 'Map';
export const STRUCT = 'Struct';
export const FUNC = 'Func';
export const ANY = '*';


export class Type {
  constructor(name, color = 'black') {
    this.name = name;
    this.color = color;
    this.properties = [];
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
  }
}

export class NumLit extends Type {
  constructor() {
    super(NUMBER, 'green');
  }
}

export class BoolLit extends Type {
  constructor() {
    super(BOOLEAN, 'red');
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
  const mapped = {
    FLOW: Flow,
    NUMBER: NumLit,
    STRING: StringLit,
    BOOLEAN: BoolLit,
    // LIST: List,s
  };
  console.log('DATA:  ', data.toUpperCase());
  console.log(mapped);
  console.log();
  if (data.toUpperCase() in mapped) {
    return new mapped[data.toUpperCase()]();
  }
};
// module.exports = {
//   Type, Flow, StringLit, NumLit, BoolLit, List, Struct, Func, Map,
// };
