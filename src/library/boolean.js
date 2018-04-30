import NodeFactory from './tools/node-factory';

export default {
  not: new NodeFactory('not').pureData({
    in: {
      a: 'boolean',
    },
    out: {
      '!a': 'boolean',
    },
    compile: '!({a})',
  }),


  or: new NodeFactory('or').pureData({
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} || {b})',
  }),
  and: new NodeFactory('and').pureData({
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} && {b})',
  }),
  'exclusive or': new NodeFactory('xor').pureData({
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} !== {b})',
  }),
  'negative and': new NodeFactory('nand').pureData({
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '(!{a} && !{b})',
  }),
  'not equals': new NodeFactory('not equals').pureData({
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} !=== {b})',
  }),
  equals: new NodeFactory('equals').pureData({
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} === {b})',
  }),
};
