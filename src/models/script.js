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

    this.generation = {
      vars: [],
      statements: [],
    };
    console.log(this);

    this.inputs = {};
    this.outputs = {};
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

  getTypes() {
    let types = [];
    let current = this;
    while (current) {
      console.log(current);
      types = types.concat(current.types);
      current = current.parent;
    }
    return types;
  }

  getVariables() {
    return { ...this.inputs, ...this.variables };
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
      return this.parent.getVariable(name);
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

  /**
   *  generation
   */
  resetGenerate() {
    this.nodes.forEach((node) => {
      node.label = null;
    });
    this.generation = {
      vars: [],
      statements: [],
    };
  }

  generate() {
    function* labelMaker(script) {
      let index = 1;
      while (true) {
        const label = `_${index}`;
        script.generation.vars.push(label);
        yield label;
        index += 1;
      }
    }

    this.labelGenerator = labelMaker(this);
    const starts = this.nodes.filter(node => node.name === 'start').sort(node => node.y).reverse();
    starts.forEach((start) => {
      start.generateBlock();
    });

    const { vars, statements } = this.generation;
    this.resetGenerate();
    return `${vars.map(v => `let ${v};`).join()}  ${statements.join(';')};`;
  }
}

export class FunctionDeclarationScript extends Script {
  constructor(name, parent) {
    super(name, parent, TYPE.FUNC);

  }

  addInput(variable) {
    if (variable.name in this.inputs) {
      window.Console.log('cannot add input');
    }
    this.inputs[variable.name] = variable;
  }

  addOutput(variable) {
    if (variable.name in this.outputs) {
      window.Console.log('cannot add input');
    }
    this.outputs[variable.name] = variable;
  }

  generateFunction() {
    return `((${Object.keys(this.inputs).join(', ')}) => { ${this.generate()} })`;
  }
}
