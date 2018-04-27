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
};
