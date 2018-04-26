import NodeFactory from './node-factory';
import { Flow, BoolLit, NumLit, Type, Relative, Input, List } from './../type/type';
import { LIST } from './../type/type-type';

const isList = type => type.name === LIST;

export default {
  makeList: (new NodeFactory('makeList'))
    .addPin('in', 'type', new Type())
    .addPin('out', 'new-list', new Relative('type', 'listOf', 'value'))
    .generateFunction('[]'),
  pop: (new NodeFactory('pop'))
    .addPin('in', 'list', new Input(isList))
    .addPin('out', 'elem', new Relative('list', 'elementType'))
    .generateFunction('({in}.pop())'),
  push: (new NodeFactory('push'))
    .addPin('in', 'list', new Input(isList)) // input should take in a funciton that validates the type
    .addPin('in', 'val', new Relative('list', 'elementType'))
    .addPin('out', 'elem', new Relative('list', 'same'), 'arr')
    .addPin('out', 'len', new NumLit(), 'length')
    .generateFunction('(() => { const L = {list}; L.push({val}); return { arr: L, length: L.length } })()'),
};
