import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropDownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.setState({
      value: evt.target.value,
    });
    this.props.onChange(evt.target.value);
  }

  render() {
    return (
      <foreignObject x={this.props.x} y={this.props.y} width="10" height="150">
        <select name={this.props.name} onChange={this.onChange} value={this.state.value} onClick={(evt) => { evt.preventDefault(); evt.stopPropagation(); }}>
          {this.state.options.map(o => (
            <option name={o}> {this.props.optionToDisplay(o)} </option>
          ))}
        </select>
      </foreignObject>
    );
  }
}

DropDownInput.defaultProps = {
  x: 0,
  y: 0,
  name: 'default',
  options: [],
  onChange: () => {},
  optionToDisplay: option => option,
};

DropDownInput.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  optionToDisplay: PropTypes.func,
};

export default DropDownInput;
