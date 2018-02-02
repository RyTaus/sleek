const d3 = require('d3');

/*
  Component handles animating and updating images view when the model changes.
*/
class Component {
  constructor(svg) {
    this.svg = svg;
    this.id = `comp_id_${Component.currentID}`;
    Component.currentID += 1;
  }

  createSvgNode(className) {
    this.svg.append(className).attr('id', this.id);
  }

  createSvgNodeInput() {
    this.svg.append('rect').classed('inputbg', true).attr('id', this.id + '_border');
    this.svg.append('text').attr('id', this.id);
  }

  getNode() {
    return d3.select('svg').selectAll(`#${this.id}`);
  }

  setSVG(elem) {
    this.elem = elem;
  }

  setOnChange(fun) {
    this.onChange = fun;
  }

  update(prop, value) {
    this[prop] = value;
    this.render();
  }

  onRender(elem) {
    this.setSVG(elem);
  }
}

Component.currentID = 0;

module.exports = Component;
