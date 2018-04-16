export const BODY = 'clos.body';
export const FUNC = 'clos.function';


export default class Closure {
  // Type is like either body, loop, class, functions
  constructor(parent, type) {
    this.variables = {};
    this.parent = parent;
    this.type = type;
  }

  add(name, type) {
    if (this.includes(name)) {
      throw new Error(`Cannot add ${name}, it is already in this closure`);
    }
    this.variables[name] = type;
    return this;
  }

  includes(name) {
    return name in this.variables;
  }

  remove(name) {
    delete this.variables[name];
  }

  get(name) {
    if (this.includes(name)) {
      return this.variables[name];
    } else if (this.parent) {
      return this.parent.get(name);
    }
    throw new Error(`${name} is not in scope.`);
  }
}
