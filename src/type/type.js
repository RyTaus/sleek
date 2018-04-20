export const FLOW = 'Flow';
export const NUMBER = 'Number';
export const STRING = 'String';
export const BOOLEAN = 'Boolean';
export const LIST = 'List';
export const LABEL = 'Label';
export const TYPE = 'Type';
export const MAP = 'Map';
export const STRUCT = 'Struct';
export const FUNC = 'Func';
export const ANY = '*';

export const RELATIVE = 'Relative';
export const SAME = 'same';
export const VALUE = 'Value';
export const ELEM_OF = 'elementType';
export const PROP_OF = 'PropOf';
export const KEY_OF = 'keyType';
export const VAL_OF = 'valType';

export const LIST_OF = 'listOf';

export const INPUT = 'Input';


export class T {
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

  isCompatible(other) {
    if (this.name === INPUT || other.name === INPUT) {
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
    super(INPUT, 'gray');
    this.possible = possible;
  }
}

export class Flow extends T {
  constructor() {
    super(FLOW, 'white');
  }
}

export class StringLit extends T {
  constructor() {
    super(STRING, 'blue');
    this.defaultValue = '';
  }
}

export class NumLit extends T {
  constructor() {
    super(NUMBER, 'green');
    this.defaultValue = 0;
  }
}

export class BoolLit extends T {
  constructor() {
    super(BOOLEAN, 'red');
    this.defaultValue = false;
  }
}

export class Label extends T {
  constructor() {
    super(LABEL, 'gray');
    this.defaultValue = 'None';
  }
}

export class List extends T {
  constructor(elementType) {
    super(LIST, elementType.color);
    this.elementType = elementType;
  }

  toString() {
    return `List<${this.elementType.toString()}>`;
  }
}

export class Map extends T {
  constructor(structName, inType, outType) {
    super(MAP, 'yellow');
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

export class Type extends T {
  constructor() {
    super(TYPE, 'skyblue');
    this.defaultValue = new NumLit();
  }

  toString() {
    return this.name;
  }
}

export class Relative extends T {
  constructor(pinName, of, value) {
    super(RELATIVE, 'coral');
    this.relativeName = pinName;
    this.type = of;
    this.isValue = value;
  }

  getType(node) {
    if (this.isValue) {
      const type = node.inPins[this.relativeName].value;
      if (this.type === LIST_OF) {
        return new List(type);
      }
    }
    if (this.type === SAME) {
      return node.inPins[this.relativeName].getType();
    } else if (this.type === VALUE) {
      return node.inPins[this.relativeName].value;
    } else if (this.type === LIST_OF) {
      // console.log();
      return new List(node.inPins[this.relativeName].getType());
    }
    const type = node.inPins[this.relativeName].getType()[this.type];
    if (!type) {
      return new T('UNKNOWN', 'black');
    }
    return type;
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
