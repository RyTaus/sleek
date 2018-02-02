const d3 = require('d3');

const Canvas = require('./visual/canvas.js');

const SVG = d3.select('svg');

const pb = require('./prebuilt-nodes.js');

const canvas = new Canvas(SVG);

const add = new pb.Add(350, 160, SVG);
const n1 = new pb.PrimNumber(150, 100, SVG);
const n2 = new pb.PrimNumber(150, 250, SVG);

n1.inPins[0].setValue(4);
n2.inPins[0].setValue(-87);

canvas.addNode(0, add);
canvas.addNode(0, n1);
canvas.addNode(0, n2);

canvas.render();

d3.select('body').selectAll('button')
  .on('click', () => {
    console.log(add.compile());
    console.log(eval(add.compile()));
  });
