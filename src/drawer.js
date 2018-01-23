

// const Snap = require('snapsvg');
const d3 = require('d3');

// const { Node, Pin, Edge } = require('./nodes.js');
const Pin = require('./pin.js');
const Node = require('./node.js');


// const SVG = document.getElementsByClassName('canvas')[0];

const SVG = d3.select('svg');

let n = new Node('Test', [0, 1, 4, 8], 50, 80, [new Pin(true), new Pin()], [new Pin(true)]);

console.log(n);
n.draw(SVG);
