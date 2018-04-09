import React, { Component } from 'react';

import Node from './node';
import Pin from './node';

import Size from './../utils/sizes';

import nodes from './../nodes/number';

class NodeSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    }
    this.name = 'node-searcher';
    this.getOptions = this.getOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getOptions() {
    return Object.keys(nodes);
  }

  handleClick() {
    this.setState({
      active: false,
    });
    console.log('clicked');
  }

  makePin(name, data) {
    return new Pin.ValuePin({ name: Object.keys(data)[0], type: data[Object.keys(data)[0]], connections: [] });
  }

  handleChange(evt) {
    const data = evt.target.value;

    // const node = new Node.Node({ x: this.props.x, y: this.props.y, name: evt.target.value, inPins: Object.keys(data.in).map(pin => )})
    this.props.handleChange(this.getOptions()[evt.target.value])
  }

  render() {
    if (!this.props.active || !this.state.active) {
      return null;
    }

    return (
      <foreignObject x={this.props.x} y={this.props.y} >
        <select style={{ width: Size.NodeSearcher.width }} name={this.name} onChange={this.handleChange} onClick={(evt) => { evt.preventDefault(); evt.stopPropagation(); }}>
          {this.getOptions().map(o => (
            <option name={o} onClick={this.handleClick}> {o} </option>
          ))}
      </select>

      </foreignObject>
    );
  }
}

export default NodeSearcher;
