import NodeFactory from './tools/node-factory';


export default {
  negate: new NodeFactory('negate').pureData({
    in: {
      num: 'Number',
    },
    out: {
      '-num': 'Number',
    },
    compile: '(-{num})',
  }),
  'absolute value': new NodeFactory('absolute value').pureData({
    in: {
      num: 'Number',
    },
    out: {
      res: 'Number',
    },
    compile: '(Math.abs({num}))',
  }),
  floor: new NodeFactory('floor').pureData({
    in: {
      num: 'Number',
    },
    out: {
      res: 'Number',
    },
    compile: '(Math.floor({num}))',
  }),
  ceiling: new NodeFactory('ceiling').pureData({
    in: {
      num: 'Number',
    },
    out: {
      res: 'Number',
    },
    compile: '(Math.ceil({num}))',
  }),
  round: new NodeFactory('round').pureData({
    in: {
      num: 'Number',
    },
    out: {
      res: 'Number',
    },
    compile: '(Math.round({num}))',
  }),
  random: new NodeFactory('random').pureData({
    in: {
      min: 'Number',
      max: 'Number',
    },
    out: {
      res: 'Number',
    },
    compile: '(Math.random() * ( {max} - {min} + 1 ) + {min})',
  }),


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
  divide: new NodeFactory('divide').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      quotient: 'Number',
    },
    compile: '({a} / {b})',
  }),
  'integer divide': new NodeFactory('integer divide').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      quotient: 'Number',
    },
    compile: '({a} // {b})',
  }),
  mod: new NodeFactory('mod').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      remainder: 'Number',
    },
    compile: '({a} % {b})',
  }),
  power: new NodeFactory('power').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      res: 'Number',
    },
    compile: '({a} ** {b})',
  }),

  equals: new NodeFactory('equals').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      res: 'Boolean',
    },
    compile: '({a} === {b})',
  }),
  'greater than': new NodeFactory('greater than').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      res: 'Boolean',
    },
    compile: '({a} > {b})',
  }),
  'less than': new NodeFactory('less than').pureData({
    in: {
      a: 'Number',
      b: 'Number',
    },
    out: {
      res: 'Boolean',
    },
    compile: '({a} < {b})',
  }),
  Number: new NodeFactory('Number').pureData({
    in: {
      num: 'Number',
    },
    out: {
      res: 'Number',
    },
    compile: '({num})',
  }),
};
