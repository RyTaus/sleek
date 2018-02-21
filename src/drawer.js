const d3 = require('d3');
const Graphik = require('graphik');

console.log(Graphik);
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
  this.parentNode.appendChild(this);
  });
};

const Canvas = require('./view/canvas.js');

const SVG = d3.select('svg');

const canvas = new Canvas(SVG);

canvas.render();

d3.select('body').selectAll('button')
  .on('click', () => {
    const result = canvas.compile();
    // const result = add.compile();
    console.log(result);
    console.log(eval(result));
  });

const sideBar = d3.select('.sidebar');
sideBar
  .append('button')
  .text('new variable');
