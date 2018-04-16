import React, { Component } from 'react';

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(evt) {

  }

  render() {
    return (
      <div className="item" >{this.props.name} </div>
    );
  }

}
