const d3 = require('d3');

/*
  Component handles animating and updating images view when the model changes.
*/
class Component {
  constructor(fileView, interactable = true) {
    this.isInteractable = interactable;
    this.fileView = fileView;
    this.svg = fileView.svg;
    this.id = `comp_id_${Component.currentID}`;
    Component.currentID += 1;
  }

  initialize() {
    if (this.isInteractable) {
      this.svgNode
        .on('mouseenter', () => {
          this.fileView.focus(this);
        });
    }
  }

  createSvgNodeSearcher() {
    this.svgNode = this.svg.select('g').append('rect').attr('id', `${this.id}`);
    this.svg.select('g').append('rect').attr('id', `${this.id}_search`);
    this.svg.select('g').append('rect').attr('id', `${this.id}_results`);
  }

  getNode(extension = '') {
    return d3.select('svg').selectAll(`#${this.id}${extension ? '_' : ''}${extension}`);
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
