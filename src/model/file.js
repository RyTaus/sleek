const fs = require('fs');
const JSON = require('circular-json');
const Node = require('./node.js');
const Pin = require('./pin.js');
const nodes = require('./../prebuilt-nodes.js');

class File {
  constructor(name) {
    this.name = name;
    this.nodes = [];
    this.scope = {};
  }

  addNode(node) {
    node.file = this;
    this.nodes.push(node);
  }

  compile() {
    let result = '/* compiled code */';
    this.nodes.filter(n => n.name === 'START').sort((a, b) => a.y - b.y).forEach((node) => {
      let curr = node;
      while (curr.getNextNode()) {
        curr = curr.getNextNode();
      }
      result += '\n';
      result += curr.compile();
      result += ';';
    });
    return result;
  }

  save() {
    const toSave = {
      name: this.name,
      nodes: [],
      scope: this.scope
    };

    // Assign IDs
    this.nodes.forEach((n, i) => {
      n.id = `${i}`;
      n.inPins.forEach((p, i) => {
        p.id = `${n.id}_in_${i}`
      });
      n.outPins.forEach((p, i) => {
        p.id = `${n.id}_out_${i}`
      });
    });

    toSave.nodes = this.nodes.map(n => n.save());
    fs.writeFile('save.json', JSON.stringify(toSave), 'utf8', () => console.log('saved'));
  }

  load(data, view) {
    console.log(data);
    this.nodes = [];
    data.nodes.forEach((n) => {
      this.nodes.push(new nodes[n.name](n.x, n.y));
    });
    data.nodes.forEach((n, nIndex) => {
      n.inPins.forEach((p, pIndex) => {
        console.log(p);
        if (p === null) {
          return;
        } else if (p.pinType !== 'input') {
          const vals = p.id.split('_');
          this.nodes[nIndex].inPins[pIndex].connect(this.nodes[vals[0]].outPins[vals[2]]);
        } else {
          this.nodes[nIndex].inPins[pIndex].setValue(p.value);
        }
      });
    });
    this.scope = data.scope;
    this.name = data.name;
    console.log(this);
    view.load(this);
  }

  addVariable(name) {
    if (Object.keys(this.scope).includes(name)) {
      throw new Error('variable already declared in this scope');
    }
    this.scope[name] = {};
  }
}

module.exports = File;
