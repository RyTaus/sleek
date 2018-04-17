import React, { Component } from 'react';

import File from './file';
import Frame from './frames/frame';
import Console from './console/console';
import Header from './header';

import Script from './../models/script';
import ScriptType from './../models/script-type';


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
    this.script = new Script('test', 'null', ScriptType.BODY);
  }

  render() {
    return (
      <div>
        <Header tabs={this.files} />
        <Frame script={this.script} />
        {this.console.render()}
      </div>
    );
  }
}

export default Project;
