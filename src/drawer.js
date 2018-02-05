const d3 = require('d3');

const Canvas = require('./visual/canvas.js');

const SVG = d3.select('svg');

const pb = require('./prebuilt-nodes.js');

const canvas = new Canvas(SVG);

const multiply = new pb.Multiply(350, 160, SVG);
const add = new pb.Add(350, 260, SVG);

const n1 = new pb.PrimNumber(150, 100, SVG);
const n2 = new pb.PrimNumber(150, 250, SVG);

n1.inPins[0].setValue(4);
n2.inPins[0].setValue(-87);

canvas.addNode(0, add);
canvas.addNode(0, n1);
canvas.addNode(0, n2);
canvas.addNode(0, multiply);

canvas.render();

d3.select('body').selectAll('button')
  .on('click', () => {
    const result = canvas.statements[0].compile();
    // const result = add.compile();
    console.log(result);
    console.log(eval(result));
  });
