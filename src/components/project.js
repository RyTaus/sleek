import React, { Component } from 'react';

import Script from './script';
import Console from './console/console';
import Header from './header';

import ScriptModel from './../models/script';
import ScriptType from './../models/script-type';


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
    this.console = new Console({ height: '20%', project: this });
    window.Console = this.console;
    this.scriptModel = new ScriptModel('test', 'null', ScriptType.BASE);

    this.generate = this.generate.bind(this);
  }

  generate() {
    window.Console.log(this.scriptModel.generate());
  }

  render() {
    return (
      <div>
        <Header tabs={this.files} generate={this.generate} />
        <Script script={this.scriptModel} />
        {this.console.render()}
      </div>
    );
  }
}

export default Project;
