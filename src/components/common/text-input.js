import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      value: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    if (this.props.isValid(evt.target.value)) {
      this.setState({
        value: evt.target.value,
      });
    }
  }

  render() {
    return (
      <foreignObject x={this.state.x} y={this.state.y} width="10" height="10">
        <input type="text" value={this.state.value} onChange={this.onChange} size="10" />
      </foreignObject>
    );
  }
}

TextInput.defaultProps = {
  x: 0,
  y: 0,
  isValid: () => true,
};

TextInput.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  isValid: PropTypes.func,
};

export default TextInput;
