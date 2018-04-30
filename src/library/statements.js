import NodeFactory from './tools/node-factory';

import Variable from './../models/variable';
import { Flow, BoolLit, NumLit, StringLit, Input, Label, Relative, Func, Evaluate,  } from './../type/type';
import { SAME, INSTANCE, FUNC, FLOW } from './../type/type-type';
import ScriptType from './../models/script-type';

const isFunc = type => type.name === FUNC;
export default {
  start: new NodeFactory('start')
    .addPin('out', ' ', new Flow())
    .generateFunction('"start"'),
  print: new NodeFactory('print')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'val', new Input(type => type.name !== FLOW))
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
  for: new NodeFactory('for')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'start', new NumLit())
    .addPin('in', 'stop', new NumLit())
    .addPin('in', 'step', new NumLit())
    .addPin('out', 'body', new Flow())
    .addPin('out', 'index', new Evaluate(new Variable('_index_', new NumLit())))
    .addPin('out', 'next', new Flow())
    .generateFunction((node) => {
      const { start, stop, step } = node.inPins;
      return `for (let _index_ = ${start.generate()}; _index_ < ${stop.generate()}; _index_ += ${step.generate()})
      { ${node.outPins.body.generate()} };`
    }),
  assign: new NodeFactory('assign')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'variable', new Label())
    .addPin('in', 'value', new Relative('variable', INSTANCE))
    .addPin('out', 'next', new Flow())
    .generateFunction((node) => {
      return `(${node.inPins.variable.value.name} = ${node.inPins.value.generate()})`;
    }),
  get: new NodeFactory('get')
    .addPin('in', 'variable', new Label())
    .addPin('out', 'value', new Relative('variable', INSTANCE))
    .generateFunction((node) => {
      return `(${node.inPins.variable.value.name})`;
    }),
};
