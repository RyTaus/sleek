import React, { Component } from 'react';

import File from './file';
import Console from './console/console';


class Project extends Component {
  constructor(props) {
    super(props);
    this.console = new Console({ height: '20%', project: this });
    window.Console = this.console;
  }

  render() {
    return (
      <div>
        <File />
        {this.console.render()}
      </div>
    );
  }
}

export default Project;
