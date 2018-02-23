const d3 = require('d3');
const uglify = require('uglify-js');
const Graphik = require('graphik');
const fs = require('fs');
const json = require('circular-json');


console.log(Graphik);
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
  this.parentNode.appendChild(this);
  });
};

const File = require('./model/file.js')
const FileView = require('./view/file-view.js');

const SVG = d3.select('svg');
const sidebar = d3.select('.right');

const file = new File('tester');
const canvas = new FileView(file, SVG, sidebar);

canvas.render();
console.log(fs);
d3.select('body').selectAll('#compile')
  .on('click', () => {
    const result = canvas.file.compile();

    console.log(result);
    // TODO LOOK INTO JSCompress
    console.log(uglify.minify(result).code);
    console.log(eval(result));
  });

d3.select('body').selectAll('#save')
  .on('click', () => {
    file.save();
  });

d3.select('body').selectAll('#load')
  .on('click', () => {
    fs.readFile('save.json', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(canvas);
      file.load(json.parse(data), canvas);
    });
  });
