class File {
  constructor(name) {
    this.name = name;
    this.statements = [];
    this.scope = {};
  }
}

module.exports = File;
