const d3 = require('d3');

const Canvas = require('./visual/canvas.js');
const Pin = require('./visual/pin.js');
const Node = require('./visual/node.js');


const SVG = d3.select('svg');

// const n = new Node('Test', [0, 1, 4, 8], 50, 80, [new Pin.Flow(), new Pin.Value(), new Pin.Input()], [new Pin.Flow()]);

// console.log(n);
// n.draw(SVG);
// console.log(SVG);

const pb = require('./prebuilt-nodes.js');

const canvas = new Canvas();

const add = new pb.Add(350, 160);
const n1 = new pb.PrimNumber(150, 100);
const n2 = new pb.PrimNumber(150, 250);

n1.inPins[0].setValue(4);
n2.inPins[0].setValue(-87);


// add.inPins[1].connect(n1.outPins[0]);
// add.inPins[2].connect(n2.outPins[0]);

canvas.addNode(0, add);
canvas.addNode(0, n1);
canvas.addNode(0, n2);


console.log(add);
console.log(n1);
console.log(n2);

canvas.draw(SVG);

console.log(add.compile());


// add.draw(SVG);
