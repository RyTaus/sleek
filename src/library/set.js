import NodeFactory from './tools/node-factory';
import { Flow, BoolLit, NumLit, StringLit, Type, Relative, Input, List, Func } from './../type/type';
import { LIST, FUNC, SET } from './../type/type-type';

const isList = type => type.name === LIST;
const isSet = type => type.name === SET;
const isFunc = type => type.name === FUNC;

export default {
  Set: (new NodeFactory('Set'))
    .addPin('in', 'type', new Type())
    .addPin('out', 'new set', new Relative('type', 'setOf', 'value'))
    .generateFunction('new Set([])'),
  add: (new NodeFactory('add'))
    .addPin('in', 'set', new Input(isSet))
    .addPin('in', 'val', new Relative('set', 'elementType'))
    .addPin('out', 'set', new Relative('set', 'same'))
    .generateFunction('({set}.add({val}))'),
  has: (new NodeFactory('has'))
    .addPin('in', 'set', new Input(isSet))
    .addPin('in', 'val', new Relative('set', 'elementType'))
    .addPin('out', 'res', new BoolLit())
    .generateFunction('({set}.has({val}))'),
  delete: (new NodeFactory('delete'))
    .addPin('in', 'set', new Input(isSet))
    .addPin('in', 'val', new Relative('set', 'elementType'))
    .addPin('out', 'set', new Relative('set', 'same'), 'set')
    .addPin('out', 'deleted', new BoolLit(), 'deleted')
    .generateFunction((node) => {
      const { set, val } = node.inPins;
      return `(() => { const S = ${set.generate()}; const B = S.delete(${val.generate()}); return { set: S, deleted: B } })()`;
    }),

};
