import NodeFactory from './node-factory';
import { Flow, BoolLit, NumLit, Type, Relative, Input, List } from './../type/type';

export default {
  makeList: (new NodeFactory('makeList'))
    .addPin('in', 'type', new Type())
    .addPin('out', 'new-list', new Relative('type', 'listOf', 'value')),
  pop: (new NodeFactory('pop'))
    .addPin('in', 'list', new Input())
    .addPin('out', 'elem', new Relative('list', 'elementType')),
  popBool: (new NodeFactory('popBool'))
    .addPin('in', 'list', new List(new BoolLit()))
    .addPin('out', 'elem', new Relative('list', 'elementType')),
};
