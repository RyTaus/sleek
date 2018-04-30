import React, { Component } from 'react';

import Item from './item';

export default class ItemGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  renderItems() {
    return Object.keys(this.props.data)
      .filter(key => key.includes(this.props.searcher.state.searchString))
      .sort()
      .map(key => (
        <Item
          handleClick={this.props.handleClick}
          data={this.props.data[key]}
          name={key}
        />
      )
    );
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    if (Object.keys(this.props.data).filter(key => key.includes(this.props.searcher.state.searchString)).length === 0) {
        return null;
      }
    return (
      <div className="item-group" onClick={this.handleClick}>
        <div>{(this.state.open ? '\u25BC' : '\u25BA') + this.props.name} </div>
        {this.state.open ? this.renderItems() : null}
      </div>
    );
  }
}
