
export default {
  add: {
    in: {
      addend1: 'Number',
      addend2: 'Number',
    },
    out: {
      sum: 'Number',
    },
    compile: '({i0} + {i1})',
  },
  multiply: {
    in: {
      addend1: 'Number',
      addend2: 'Number',
    },
    out: {
      sum: 'Number',
    },
    compile: '({i0} * {i1})',
  },
};
