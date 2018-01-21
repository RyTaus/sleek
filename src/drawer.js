let Node = require('./nodes.js');

const SVG = document.getElementsByClassName('canvas')[0];

let n = new Node('Test', [0, 1, 4, 8], 50, 80, 100, 50);

n.draw(SVG)
