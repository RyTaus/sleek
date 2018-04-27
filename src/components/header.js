import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.name = 'header';
  }

  render() {
    return (
      <div className={this.name}>
        <ul>
          <li><button> 💾 </button></li>
          <li><button> ∏ </button></li>
          <li><button onClick={this.props.previousScript}> ↲ </button></li>
          <li><button onClick={this.props.generate}> ⚙ </button></li>
        </ul>
        <span style={{ fontSize: 'small' }}> {this.props.scriptName} </span>

      </div>
    );
  }
}

export default Header;
