import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.name = 'search-bar';

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.handleChange(evt);
  }


  render() {
    return (
      <input
        type="search"
        id="search"
        size="30"
        onChange={this.handleChange}
        value={this.props.value}
        placeholder="Search..."
      />
    );
  }
}
