import NodeFactory from './tools/node-factory';

import { Flow, BoolLit, NumLit, StringLit, Input, Label, Relative, Func } from './../type/type';
import { SAME, INSTANCE, FUNC, FLOW } from './../type/type-type';
import ScriptType from './../models/script-type';

const isFunc = type => type.name === FUNC;
export default {
  'function': new NodeFactory('function')
    .setDeclType(ScriptType.FUNC)
    .addPin('out', 'function', new Func())
    .generateFunction(node => node.innerScript.generateFunction()),
  call: new NodeFactory('call')
    .addPin('in', 'function', new Input(isFunc))
    .generateFunction((node) => {
      const args = Object.keys(node.inPins)
        .filter(key => node.inPins[key].name !== 'function')
        .map(key => node.inPins[key].generate());
      return `${node.inPins.function.generate()}(${args.join(', ')})`;
    }),
  return: new NodeFactory('return')
    .generateFunction((node) => {
      const args = Object.keys(node.inPins)
        .filter(key => node.inPins[key].type.name !== FLOW)
        .map(key => `${key}: ${node.inPins[key].generate()}`);
      return `return { ${args.join(', ')}}`;
    }),
};
