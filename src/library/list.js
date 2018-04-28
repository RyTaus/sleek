import NodeFactory from './node-factory';
import { Flow, BoolLit, NumLit, Type, Relative, Input, List, Func } from './../type/type';
import { LIST, FUNC } from './../type/type-type';

const isList = type => type.name === LIST;
const isFunc = type => type.name === FUNC;


export default {
  makeList: (new NodeFactory('makeList'))
    .addPin('in', 'type', new Type())
    .addPin('out', 'new-list', new Relative('type', 'listOf', 'value'))
    .generateFunction('[]'),
  map: new NodeFactory('map')
    .addPin('in', 'list', new Input(isList))
    .addPin('in', 'func', new Input(isFunc))
    .addPin('out', 'list', new Relative('list', 'output')),
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
