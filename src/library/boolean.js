
export default {
  and: {
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} && {b})',
  },
  or: {
    in: {
      a: 'boolean',
      b: 'boolean',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} || {b})',
  },
  not: {
    in: {
      a: 'boolean',
    },
    out: {
      '!a': 'boolean',
    },
    compile: '!({a})',
  },
};
