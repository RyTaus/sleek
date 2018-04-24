import NodeFactory from './node-factory';


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
};
