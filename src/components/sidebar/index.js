import React, { Component } from 'react';


import AddVariable from './add-variable';
import Variable from './variable';

import ScriptType from './../../models/script-type';

import './styles.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleAddVariable = this.handleAddVariable.bind(this);
  }

  handleAddVariable(type) {
    return variable => this.props.addVariable(type, variable);
  }

  renderVariableList(type) {
    const { script } = this.props.script.props;

    const addName = `add${type.substring(0, type.length - 1)}`;
    const vars = script[type.toLowerCase()];
    return (
      <div className="variable-type-box">
        <AddVariable name={type} types={this.props.types} handleSubmit={this.handleAddVariable(addName)} />
        {Object.keys(vars).map(key => (<Variable variable={vars[key]} canPull={type !== 'Outputs'} script={this.props.script} />))}
      </div>
    );
  }

  renderFunctionMenu() {
    const { script } = this.props.script.props;
    // const inputList = Object.keys(script.inputs).map(key => )
    return (
      <div>
        {this.renderVariableList('Inputs')}
        {this.renderVariableList('Outputs')}
      </div>
    );
  }

  render() {
    const { script } = this.props.script.props;
    return (
      <div
        className="sidebar"
        style={{ width: this.props.width, height: this.props.height }}
        onClick={this.props.script.eventHandler.dismissBoth}
      >
        {this.renderVariableList('Variables')}

        {script.type === ScriptType.FUNC ? this.renderFunctionMenu() : null}
      </div>
    );
  }
}

export default Sidebar;
