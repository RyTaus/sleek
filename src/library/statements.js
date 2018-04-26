import NodeFactory from './node-factory';

import { Flow, BoolLit, NumLit, StringLit, Input, Label, Relative, Func } from './../type/type';
import { SAME, INSTANCE, FUNC, FLOW } from './../type/type-type';
import ScriptType from './../models/script-type';

export default {
  start: new NodeFactory('start').pureData({
    in: {
    },
    out: {
      next: 'flow',
    },
    compile: '',
  }),
  print: new NodeFactory('print')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'val', new Input())
    .addPin('out', 'next', new Flow())
    .generateFunction('window.Console.log({val})'),
  if: new NodeFactory('if')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'condition', new BoolLit())
    .addPin('out', 'true', new Flow())
    .addPin('out', 'false', new Flow())
    .generateFunction((node) => {
      return `if (${node.inPins.condition.generate()}) { ${node.outPins.true.generate()} } else { ${node.outPins.false.generate()} }`;
    }),
  while: new NodeFactory('while')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'condition', new BoolLit())
    .addPin('out', 'body', new Flow())
    .addPin('out', 'next', new Flow())
    .generateFunction((node) => {
      return `if (${node.inPins.condition.generate()}) { ${node.outPins.body.generate()} }`;
    }),
  set: new NodeFactory('set')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'variable', new Label())
    .addPin('in', 'value', new Relative('variable', INSTANCE))
    .addPin('out', 'next', new Flow())
    .generateFunction((node) => {
      return `(${node.inPins.variable.generate()} = ${node.inPins.value.generate()})`;
    }),
  get: new NodeFactory('get')
    .addPin('in', 'variable', new Label())
    .addPin('out', 'value', new Relative('variable', INSTANCE))
    .generateFunction((node) => {
      console.log(node);
      return `(${node.inPins.variable.value.name})`;
    }),
  functionDecl: new NodeFactory('Fun Decl')
    .setDeclType(ScriptType.FUNC)
    .addPin('out', 'function', new Func())
    .generateFunction(node => node.innerScript.generateFunction()),
  call: new NodeFactory('call')
    .addPin('in', 'function', new Input())
    .generateFunction((node) => {
      const args = Object.keys(node.inPins)
        .filter(key => node.inPins[key].name !== 'function')
        .map(key => node.inPins[key].generate())
      return `${node.inPins.function.generate()}(${args.join(', ')})`
    }),
  return: new NodeFactory('return')
    .generateFunction((node) => {
      const args = Object.keys(node.inPins)
        .filter(key => node.inPins[key].type.name !== FLOW)
        .map(key => `${key}: ${node.inPins[key].generate()}`);
      console.log(args);
      return `return { ${args.join(', ')}}`
    }),
};
