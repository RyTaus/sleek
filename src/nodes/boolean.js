
export default {
  and: {
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({i0} && {i1})',
  },
  or: {
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({i0} || {i1})',
  },
  not: {
    in: {
      a: 'boolean',
    },
    out: {
      '!a': 'boolean',
    },
    compile: '({i0} * {i1})',
  },
};
