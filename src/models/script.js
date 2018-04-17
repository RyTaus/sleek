import Variable from './variable';
import TYPE from './script-type';

import { StringLit, BoolLit, NumLit, Map, Func } from './../type/type';

/*
 * The window refs in here should just be throwing things, with the front end
 * parts picking them up and adding them to the console.
 *
 * List of types are all types available. Base script-type indicates to include all the default ones.
 */

export default class Script {
  constructor(name, parent, type) {
    this.name = name;
    this.nodes = [];
    this.variables = {}; // variable = { type, isConstant }
    this.parent = parent;
    this.type = type;
    this.imports = []; // List of scripts
    this.types = [];
    if (type === TYPE.BASE) {
      this.types = [StringLit, BoolLit, NumLit, Map, Func];
    }
  }

  /**
   *  Closure Stuff
   */

  addVariable(variable) {
    if (this.hasVariable(variable.name)) {
      window.Console.log('cannot add variable');
    }
    this.variables[variable.name] = variable;
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
