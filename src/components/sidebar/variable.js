import React, { Component } from 'react';

import Checkbox from './../common/checkbox';

class Variable extends Component {
  constructor(props) {
    super(props);
    this.name = 'variable';
  }

  render() {
    const { type, name, isConstant } = this.props.variable;

    return (
      <div className="variable" style={{ borderColor: type.color }}>
        <span className="variable-name"> {name} </span>
        <button className="variable-delete"> X </button>

        <Checkbox className="variable-constant" checked={isConstant} disabled zoom={1.6} />
      </div>
    );
  }
}


export default Variable;
