import React, { Component } from 'react';

import Checkbox from './../common/checkbox';

class Variable extends Component {
  constructor(props) {
    super(props);
    this.name = 'variable';

    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown(evt) {
    if (this.props.canPull) {
      this.props.script.eventHandler.startVariableDrag(this.props.variable);
    }
    evt.stopPropagation();
    evt.preventDefault();
  }

  render() {
    const { type, name, isConstant } = this.props.variable;

    return (
      <div
        className="variable"
        style={{ borderColor: type.color }}
        onMouseDown={this.onMouseDown}
      >
        <span className="variable-name"> {name} </span>
        <button className="variable-delete"> X </button>
      </div>
    );
  }
}


export default Variable;
