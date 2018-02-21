class File {
  constructor(name) {
    this.name = name;
    this.nodes = [];
    this.scope = {};
  }

  addNode(node) {
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
}

module.exports = File;
