import Variable from './variable';

export default class Script {
  constructor(name, parent, type) {
    this.name = name;
    this.nodes = [];
    this.variables = {}; // variable = { type, isConstant }
    this.parent = parent;
    this.type = type;
    this.imports = []; // List of scripts
  }

  /**
   *  Closure Stuff
   */

  addVariable(name, type, isConstant) {
    if (this.hasVariable(name)) {
      window.Console.log('cannot add variable');
    }
    this.variables[name] = new Variable(name, type, isConstant);
  }

  hasVariable(name) {
    return name in this.variables;
  }

  removeVariable(name) {
    delete this.variables[name];
  }

  getVariable(name) {
    if (this.hasVariable(name)) {
      return this.variables[name];
    } else if (this.parent) {
      return this.parent.get(name);
    }
    window.Console.log('var is not in scope');
    return null;
  }

  /**
   *  Node Stuff
   */

  addNode(node) {
    this.nodes.push(node);
  }

  removeNode(node) {
    node.remove();
    this.nodes = this.nodes.filter(n => n !== node);
  }
}
