export default {
  concat: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      new: 'Number',
    },
    compile: '({a} + {b})',
  },
  substring: {
    in: {
      string: 'String',
      start: 'Number',
      end: 'Number',
    },
    out: {
      new: 'String',
    },
    compile: '({string}.substring({start}, {end}))',
  },
  includes: {
    in: {
      string: 'String',
      substring: 'String',
    },
    out: {
      new: 'Boolean',
    },
    compile: '({string}.includes({substring})',
  },
};
