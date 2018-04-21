import NodeFactory from './node-factory';

import { Flow, BoolLit, Input } from './../type/type';

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
    .generateFunction('console.log({val})'),
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
  break: {
    in: {
      ' ': 'flow',
    },
    out: {
    },
    compile: 'break',
  },
};
