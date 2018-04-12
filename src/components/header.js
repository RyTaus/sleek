import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.name = 'header';
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul>
          <li><button> Save </button></li>
          <li><button> Load </button></li>
          <li><button> Compile </button></li>
          <li><button> Generate </button></li>
        </ul>
      </div>
    );
  }
}

export default Header;
