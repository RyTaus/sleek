import NodeFactory from './tools/node-factory';

export default {
  'string to number': new NodeFactory('string to number').pureData({
    in: {
      str: 'String',
    },
    out: {
      num: 'Number',
    },
    compile: '(parseInt({str}, 10))',
  }),
  'number to string': new NodeFactory('number to string').pureData({
    in: {
      num: 'Number',
    },
    out: {
      str: 'String',
    },
    compile: '("{num}")',
  }),
  'boolean to string': new NodeFactory('boolean to string').pureData({
    in: {
      boolean: 'Boolean',
    },
    out: {
      string: 'String',
    },
    compile: '("{boolean}")',
  }),
};
