
export default {
  add: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      sum: 'Number',
    },
    compile: '({i0} + {i1})',
  },
  subtract: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      difference: 'Number',
    },
    compile: '({i0} - {i1})',
  },
  division: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      quotient: 'Number',
    },
    compile: '({i0} / {i1})',
  },
  multiply: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      product: 'Number',
    },
    compile: '({i0} * {i1})',
  },
  greaterThan: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      res: 'boolean',
    },
    compile: '({i0} > {i1})',
  },
};
