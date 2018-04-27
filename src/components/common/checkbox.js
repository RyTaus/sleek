import React, { Component } from 'react';


class Checkbox extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const zoom = this.props.zoom !== undefined ? this.props.zoom : 1.8;
    console.log(this.props.disabled);
    return (
      <input
        className={this.props.className}
        type="checkbox"
        onMouseUp={this.props.onMouseUp}
        onChange={this.props.onChange}
        style={{ margin: 0, zoom: zoom, outline: this.props.color }}
        checked={this.props.checked}
        disabled={this.props.disabled !== undefined}
      />
    );
  }
}

export default Checkbox
