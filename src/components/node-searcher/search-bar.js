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

  filter(data) {
    const toReturn = {};
    return Object.keys(data).forEach((key) => {
      if (key.includes(key)) {
        toReturn[key] = data[key];
      }
    })
  }

  render() {
    return (
      <input type="search" id="search" size="30" onChange={this.handleChange} value={this.props.value} placeholder="Search..." autoFocus />
    );
  }
}
