import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.name = 'header';
  }

  // <li><button> 💾 </button></li>
  // <li><button> ∏ </button></li>

  render() {
    return (
      <div className={this.name} style={{ color: 'white' }}>
        <ul>
          <li><button style={{ color: 'white' }} className="add-var-button" onClick={this.props.generate}> ⚙ </button></li>
          <li><button style={{ color: 'white' }} className="add-var-button" onClick={this.props.previousScript}> ↲ </button></li>

        </ul>
        <span style={{ fontSize: 'small' }}> {this.props.scriptName} </span>

      </div>
    );
  }
}

export default Header;
