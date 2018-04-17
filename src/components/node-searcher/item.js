import React, { Component } from 'react';

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.props.handleClick(this);
  }

  render() {
    return (
      <div className="item" onClick={this.handleClick}>{this.props.name} </div>
    );
  }

}
