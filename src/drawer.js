const d3 = require('d3');

const Pin = require('./pin.js');
const Node = require('./node.js');


const SVG = d3.select('svg');

const n = new Node('Test', [0, 1, 4, 8], 50, 80, [new Pin.Flow(), new Pin.Value(), new Pin.Input()], [new Pin.Flow()]);

console.log(n);
n.draw(SVG);

const pb = require('./prebuilt-nodes.js');


// const add = new pb.Add(150, 160);
// const n1 = new pb.PrimNumber(150, 100);
// const n2 = new pb.PrimNumber(150, 250);
//
// n1.inPins[0].setValue(4);
// n2.inPins[0].setValue(-87);
//
//
// add.inPins[1].connect(n1.outPins[0]);
// add.inPins[2].connect(n2.outPins[0]);
//
// console.log(add);
// console.log(n1);
// console.log(n2);
//
// console.log(add.compile());


// add.draw(SVG);
