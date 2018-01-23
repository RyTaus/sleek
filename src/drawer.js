const d3 = require('d3');

const Pin = require('./pin.js');
const Node = require('./node.js');


const SVG = d3.select('svg');

const n = new Node('Test', [0, 1, 4, 8], 50, 80, [new Pin(Pin.Type.FLOW), new Pin(), new Pin(Pin.Type.INPUT)], [new Pin(Pin.Type.FLOW)]);

console.log(n);
n.draw(SVG);

const pb = require('./prebuilt-nodes.js');


const add = new pb.Add();
const n1 = new pb.PrimNumber();
const n2 = new pb.PrimNumber();
