import React, { Component } from 'react';
import beautify from 'js-beautify';

import Script from './script';
import Console from './console/console';
import Header from './header';

import ScriptModel from './../models/script';
import ScriptType from './../models/script-type';


class Project extends Component {
  constructor(props) {
    super(props);
    this.scriptModel = new ScriptModel('test', null, ScriptType.BASE);

    this.state = {
      activeScript: this.scriptModel,
    };
    this.console = new Console({ height: '20%', project: this });
    window.Console = this.console;

    this.scriptStack = [];

    this.generate = this.generate.bind(this);
    this.back = this.back.bind(this);
  }

  setActiveScript(script) {
    this.scriptStack.push(this.state.activeScript);
    this.setState({
      activeScript: script,
    });
    this.forceUpdate();
  }

  back() {
    if (this.scriptStack.length > 0) {
      this.setState({
        activeScript: this.scriptStack.pop(),
      });
    }
  }

  generate() {
    const output = this.scriptModel.generate();
    console.log(output);
    console.log(beautify(output));
  }

  render() {
    return (
      <div>
        <Header tabs={this.files} generate={this.generate} previousScript={this.back} />
        <Script script={this.state.activeScript} project={this} />
        {this.console.render()}
      </div>
    );
  }
}

export default Project;
