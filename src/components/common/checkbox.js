import React, { Component } from 'react';

import './styles.css';

class Checkbox extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const zoom = this.props.zoom !== undefined ? this.props.zoom : 1.7;
    console.log(this.props.disabled);
    return (
      <div className="checkbox-container" >
        <input
          className={this.props.className}
          type="checkbox"
          onMouseUp={this.props.onMouseUp}
          onChange={this.props.onChange}
          style={{ margin: 0, zoom: zoom, 'box-shadow': this.props.color, position: 'inherit' }}
          checked={this.props.checked}
          disabled={this.props.disabled !== undefined}
        />
      </div>
    );
  }
}

export default Checkbox
