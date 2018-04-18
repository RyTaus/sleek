import React, { Component } from 'react';

import Variable from './../../models/variable';

import AddVariable from './add-variable';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: this.props.frame,
    };

    this.handleAddVariableSumbit = this.handleAddVariableSumbit.bind(this);
  }

  handleAddVariableSumbit(name, type, isConstant) {
    this.props.addVariable(new Variable(name, type, isConstant));
  }

  render() {
    return (
      <div className="sidebar" style={{ width: this.props.width, height: this.props.height }}>
        <AddVariable types={this.props.types} handleSubmit={this.handleAddVariableSumbit} />
        <div> -------------- </div>
        Variables:
        {Object.keys(this.props.variables).map(key => (<div style={{ color: this.props.variables[key].type.color}}> {key} </div>))}
        <div> -------------- </div>
      </div>
    );
  }
}

export default Sidebar;
