import NodeFactory from './node-factory';

export default {
  // and: {
  //   in: {
  //     a: 'boolean',
  //     b: 'boolean',
  //   },
  //   out: {
  //     res: 'boolean',
  //   },
  //   compile: '({a} && {b})',
  // },
  // or: {
  //   in: {
  //     a: 'boolean',
  //     b: 'boolean',
  //   },
  //   out: {
  //     res: 'boolean',
  //   },
  //   compile: '({a} || {b})',
  // },
  example2: new NodeFactory('').pureData({
    in: {
      '': 'flow',
      ' ': 'number',
    },
    out: {
      '': 'flow',
      ' ': 'boolean',
      '  ': 'number'
    },
    compile: '',
  }),
  example: new NodeFactory('').pureData({
    in: {
      '': 'flow',
      ' ': 'boolean',
      '  ': 'string',
    },
    out: {
      '': 'flow',
    },
    compile: '',
  }),
  not: new NodeFactory('not').pureData({
    in: {
      a: 'boolean',
    },
    out: {
      '!a': 'boolean',
    },
    compile: '!({a})',
  }),
};
