const d3 = require('d3');

/*
  Component handles animating and updating images view when the model changes.
*/
class Component {
  constructor(svg) {
    this.svg = svg;
    this.onChange = () => {};
    this.id = `comp_id_${Component.currentID}`;
    Component.currentID += 1;
  }

  createSvgNode(className) {
    this.svg.append(className).attr('id', this.id);
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
    console.log('update');
    this[prop] = value;
    this.render();
    // callback(value); // TODO might need prop
  }

  onRender(elem) {
    this.setSVG(elem);
  }
}

Component.currentID = 0;

module.exports = Component;
