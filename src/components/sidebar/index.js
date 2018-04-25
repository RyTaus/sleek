import React, { Component } from 'react';


import AddVariable from './add-variable';

import ScriptType from './../../models/script-type';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleAddVariable = this.handleAddVariable.bind(this);
  }

  handleAddVariable(type) {
    return variable => this.props.addVariable(type, variable);
  }

  renderFunctionMenu() {
    const { script } = this.props.script.props;
    // const inputList = Object.keys(script.inputs).map(key => )
    console.log(this.props.variables);
    return (
      <div>
        Inputs:
        <AddVariable types={this.props.types} handleSubmit={this.handleAddVariable('addInput')} />
        <div> -------------- </div>
        {Object.keys(script.inputs).map(key => (<div style={{ color: script.inputs[key].type.color}}> {key} </div>))}
        <div> -------------- </div>

        Outputs:
        <AddVariable types={this.props.types} handleSubmit={this.handleAddVariable('addOutput')} />
        <div> -------------- </div>
        {Object.keys(script.outputs).map(key => (<div style={{ color: script.outputs[key].type.color}}> {key} </div>))}
        <div> -------------- </div>
      </div>
    );
  }

  render() {
    const { script } = this.props.script.props;
    return (
      <div className="sidebar" style={{ width: this.props.width, height: this.props.height }}>
        <AddVariable types={this.props.types} handleSubmit={this.handleAddVariable('addVariable')} />
        <div> -------------- </div>
        Variables:
        {Object.keys(this.props.variables).map(key => (<div style={{ color: this.props.variables[key].type.color}}> {key} </div>))}
        <div> -------------- </div>
        <div> -------------- </div>
        {script.type === ScriptType.FUNC ? this.renderFunctionMenu() : null}
      </div>
    );
  }
}

export default Sidebar;
