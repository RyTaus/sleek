const d3 = require('d3');
const uglify = require('uglify-js');
const Graphik = require('graphik');

console.log(Graphik);
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
  this.parentNode.appendChild(this);
  });
};

const File = require('./model/file.js')
const Canvas = require('./view/canvas.js');
const FileView = require('./view/file-view.js');


const SVG = d3.select('svg');

const file = new File();
const canvas = new FileView(file, SVG);

canvas.render();

d3.select('body').selectAll('button')
  .on('click', () => {
    const result = canvas.file.compile();

    console.log(result);
    // TODO LOOK INTO JSCompress
    console.log(uglify.minify(result).code);
    console.log(eval(result));
  });
