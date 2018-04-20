import NodeFactory from './node-factory';

import { Flow, BoolLit } from './../type/type';

export default {
  start: new NodeFactory('start').pureData({
    in: {
    },
    out: {
      next: 'flow',
    },
    compile: '',
  }),
  print: new NodeFactory('print').pureData({
    in: {
      ' ': 'flow',
      value: 'string',
    },
    out: {
      next: 'flow',
    },
    compile: 'console.log({value})',
  }),
  if: new NodeFactory('if')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'condition', new BoolLit())
    .addPin('out', 'true', new Flow())
    .addPin('out', 'false', new Flow())
    .generateFunction((node) => {
      return `if (${node.inPins.condition.generate()}) { ${node.outPins.true.generateBlock()} } else { ${node.outPins.false.generateBlock()} }`;
    }),
  while: new NodeFactory('while')
    .addPin('in', ' ', new Flow())
    .addPin('in', 'condition', new BoolLit())
    .addPin('out', 'body', new Flow())
    .addPin('out', 'next', new Flow())
    .generateFunction((node) => {
      return `if (${node.inPins.condition.generate()}) { ${node.outPins.body.generateBlock()} }`;
    }),
  break: {
    in: {
      ' ': 'flow',
    },
    out: {
    },
    compile: 'break',
  },
};
