import NodeFactory from './tools/node-factory';


export default {
  add: new NodeFactory('add').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      sum: 'Number',
    },
    compile: '({a} + {b})',
  }),
  subtract: new NodeFactory('subtract').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      sum: 'Number',
    },
    compile: '({a} - {b})',
  }),
  multiply: new NodeFactory('multiply').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      product: 'Number',
    },
    compile: '({a} * {b})',
  }),
  equals: new NodeFactory('equals').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      product: 'Boolean',
    },
    compile: '({a} === {b})',
  }),
  greaterThan: new NodeFactory('greaterThan').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      product: 'Boolean',
    },
    compile: '({a} >= {b})',
  }),
  lessThan: new NodeFactory('lessThan').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      product: 'Boolean',
    },
    compile: '({a} <= {b})',
  }),
};
