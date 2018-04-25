import React, { Component } from 'react';


class Checkbox extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <input
        type="checkbox"
        onMouseUp={this.props.onMouseUp}
        onChange={this.props.onChange}
        style={{ margin: 0, zoom: 1.8, outline: this.props.color }}
        checked={this.props.checked}
      />
    );
  }
}

export default Checkbox
