import NodeFactory from './tools/node-factory';
import { BoolLit, StringLit } from './../type/type';
// export default {
//   concat: {
//     in: {
//       a: 'Number',
//       b: 'Number',
//     },
//     out: {
//       new: 'Number',
//     },
//     compile: '({a} + {b})',
//   },
//   substring: {
//     in: {
//       string: 'String',
//       start: 'Number',
//       end: 'Number',
//     },
//     out: {
//       new: 'String',
//     },
//     compile: '({string}.substring({start}, {end}))',
//   },
//   includes: {
//     in: {
//       string: 'String',
//       substring: 'String',
//     },
//     out: {
//       new: 'Boolean',
//     },
//     compile: '({string}.includes({substring}))',
//   },
// };

export default {
  String: new NodeFactory('string').pureData({
    in: {
      str: 'String',
    },
    out: {
      res: 'String',
    },
    compile: '({str})',
  }),
  equals: new NodeFactory('equals').pureData({
    in: {
      a: 'String',
      b: 'String',
    },
    out: {
      res: 'Boolean',
    },
    compile: '({a}.equals({b}))',
  }),
  lowercase: new NodeFactory('lowercase').pureData({
    in: {
      str: 'String',
    },
    out: {
      res: 'String',
    },
    compile: '({str}.toLowerCase())',
  }),
  uppercase: new NodeFactory('uppercase').pureData({
    in: {
      str: 'String',
    },
    out: {
      res: 'String',
    },
    compile: '({str}.toUpperCase())',
  }),
  length: new NodeFactory('length').pureData({
    in: {
      str: 'String',
    },
    out: {
      length: 'Number',
    },
    compile: '({str}.length)',
  }),
  'character at': new NodeFactory('character at').pureData({
    in: {
      str: 'String',
      index: 'Number',
    },
    out: {
      character: 'String',
    },
    compile: '({str}.charAt({index}))',
  }),
  trim: new NodeFactory('trim').pureData({
    in: {
      str: 'String',
    },
    out: {
      res: 'String',
    },
    compile: '({str}.trim())',
  }),
  substring: new NodeFactory('substring').pureData({
    in: {
      str: 'String',
      start: 'Number',
      end: 'Number',
    },
    out: {
      substring: 'String',
    },
    compile: '({str}.slice({start}, {end}))',
  }),


  concat: new NodeFactory('concat').pureData({
    in: {
      a: 'String',
      b: 'String',
    },
    out: {
      new: 'String',
    },
    compile: '({a} + {b})',
  }),
  contains: new NodeFactory('contains')
    .addPin('in', 'string', new StringLit())
    .addPin('in', 'substring', new StringLit())
    .addPin('out', 'contains', new BoolLit())
    .generateFunction('({string}.includes({substring}))'),
};
