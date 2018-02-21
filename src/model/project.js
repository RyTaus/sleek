const File = require('./file.js');

class Project {
  constructor(name) {
    this.name = name;
    this.files = [];
  }

  addFile(file) {
    this.files.append(file);
  }

  newFile(name) {
    this.files.append(new File(name));
  }
}

module.exports = Project;
