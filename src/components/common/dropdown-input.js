import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropDownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      options: props.options,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    console.log(evt.target.value);
    this.setState({
      value: evt.target.value,
    });
  }

  render() {
    return (
      <foreignObject x={this.props.x} y={this.props.y} width="10" height="150">
        <select name={this.props.name} onChange={this.onChange} value={this.state.value}>
          {this.state.options.map(o => (
            <option name={o}> {o} </option>
          ))}
        </select>
      </foreignObject>
    );
  }
}

DropDownInput.defaultProps = {
  x: 0,
  y: 0,
  name: 'dd',
  options: [],
};

DropDownInput.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.number),
};

export default DropDownInput;
