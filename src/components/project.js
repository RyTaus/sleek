import React, { Component } from 'react';

import File from './file';
import Console from './console/console';
import Header from './header';


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
    this.console = new Console({ height: '20%', project: this });
    window.Console = this.console;
    this.files = [new File(), new File()];
    console.log(this.files);
  }

  render() {
    return (
      <div>
        <Header tabs={this.files} />
        <File />
        {this.console.render()}
      </div>
    );
  }
}

export default Project;
