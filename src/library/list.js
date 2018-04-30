import NodeFactory from './tools/node-factory';
import { Flow, BoolLit, NumLit, StringLit, Type, Relative, Input, List, Func } from './../type/type';
import { LIST, FUNC } from './../type/type-type';

const isList = type => type.name === LIST;
const isFunc = type => type.name === FUNC;


export default {
  length: (new NodeFactory('length'))
    .addPin('in', 'list', new Input(isList))
    .addPin('out', 'len', new NumLit())
    .generateFunction('({list}.length)'),

  reverse: (new NodeFactory('reverse'))
    .addPin('in', 'list', new Input(isList))
    .addPin('out', 'len', new Relative('list', 'same'))
    .generateFunction('({list}.reverse())'),

  'index of': (new NodeFactory('index of'))
    .addPin('in', 'list', new Input(isList))
    .addPin('in', 'val', new Relative('list', 'elementType'))
    .addPin('out', 'index', new NumLit())
    .generateFunction('(({list}).indexOf({val}))'),

  join: (new NodeFactory('join'))
    .addPin('in', 'list', new Input(isList))
    .addPin('in', 'with', new StringLit())
    .addPin('out', 'res', new StringLit())
    .generateFunction('(({list}).join({with}))'),

  List: (new NodeFactory('List'))
    .addPin('in', 'type', new Type())
    .addPin('out', 'new-list', new Relative('type', 'listOf', 'value'))
    .generateFunction('[]'),
  pop: (new NodeFactory('pop'))
    .addPin('in', 'list', new Input(isList))
    .addPin('out', 'elem', new Relative('list', 'elementType'))
    .generateFunction('({in}.pop())'),
  shift: (new NodeFactory('shift'))
    .addPin('in', 'list', new Input(isList))
    .addPin('out', 'elem', new Relative('list', 'elementType'))
    .generateFunction('({in}.shift())'),
  push: (new NodeFactory('push'))
    .addPin('in', 'list', new Input(isList)) // input should take in a funciton that validates the type
    .addPin('in', 'val', new Relative('list', 'elementType'))
    .addPin('out', 'elem', new Relative('list', 'same'), 'arr')
    .addPin('out', 'len', new NumLit(), 'length')
    .generateFunction('(() => { const L = {list}; L.push({val}); return { arr: L, length: L.length } })()'),
  unshift: (new NodeFactory('unshift'))
    .addPin('in', 'list', new Input(isList)) // input should take in a funciton that validates the type
    .addPin('in', 'val', new Relative('list', 'elementType'))
    .addPin('out', 'elem', new Relative('list', 'same'), 'arr')
    .addPin('out', 'len', new NumLit(), 'length')
    .generateFunction('(() => { const L = {list}; L.unshift({val}); return { arr: L, length: L.length } })()'),
};
