
export default {
  add: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      sum: 'Number',
    },
    compile: '({a} + {b})',
  },
  subtract: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      difference: 'Number',
    },
    compile: '({a} - {b})',
  },
  division: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      quotient: 'Number',
    },
    compile: '({a} / {b})',
  },
  multiply: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      product: 'Number',
    },
    compile: '({a} * {b})',
  },
  greaterThan: {
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      res: 'boolean',
    },
    compile: '({a} > {b})',
  },
};
