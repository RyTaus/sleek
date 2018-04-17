import React, { Component } from 'react';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: this.props.frame,
    };
  }

  render() {
    return (
      <div className="sidebar" style={{ width: this.props.width, height: this.props.height }}>
        sidebar
      </div>
    );
  }
}

export default Sidebar;
