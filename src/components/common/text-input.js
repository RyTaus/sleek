import React, { Component } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    if (this.props.isValid(evt.target.value)) {
      this.props.onChange(evt);
    }
  }

  render() {
    return (
      <input
        className={this.props.className}
        type="text"
        onMouseUp={this.props.onMouseUp}
        onChange={this.onChange}
        style={{ borderColor: this.props.color, width: this.props.width }}
        value={this.props.value}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default TextInput;
