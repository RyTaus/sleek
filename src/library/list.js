import NodeFactory from './node-factory';
import { Flow, BoolLit, Type, Relative, Input } from './../type/type';

export default {
  makeList: (new NodeFactory('makeList'))
    .addPin('in', 'type', new Type())
    .addPin('out', 'list', new Relative('type', 'Value')),
  pop: (new NodeFactory('pop'))
    .addPin('in', 'list', new Input())
    // .addPin('out', 'list', new Relative('type', 'Value')),
};
