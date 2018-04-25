import React, { Component } from 'react';

class DropDownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.props.onSelect(this.props.mapDisplayToOption(evt.target.value));
  }

  render() {
    return (
      <select
        name={this.props.name}
        onChange={this.onChange}
        value={this.state.value}
        onClick={(evt) => { evt.preventDefault(); evt.stopPropagation(); }}>
        {this.props.options.map((o, i) => (
          <option id={i}> {this.props.mapOptionToDisplay(o)} </option>
        ))}
      </select>
    );
  }
}

export default DropDownInput;
