import NodeFactory from './node-factory';
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
