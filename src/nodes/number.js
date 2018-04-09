
export default {
  add: {
    in: {
      addend1: 'number',
      addend2: 'number',
    },
    out: {
      sum: 'number',
    },
    compile: '({i0} + {i1})',
  },
  multiply: {
    in: {
      addend1: 'number',
      addend2: 'number',
    },
    out: {
      sum: 'number',
    },
    compile: '({i0} * {i1})',
  },
};
