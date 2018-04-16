import React, { Component } from 'react';

import Node from './node';
import NodeModel from './../models/node';
import Pin from './pin';

import Size from './../utils/sizes';

import nodes from './../nodes/index';
import parseNode from './../nodes/parser';

console.log(nodes);

class NodeSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      seed: null,
    }
    this.name = 'node-searcher';
    this.getOptions = this.getOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getOptionGroup = this.getOptionGroup.bind(this);
  }
  // LUL i just put it in a class and parse it out... NOBODY LOOK BELOW ON AN EMPTY STOMACH
  getOptionGroup(name, data) {
    console.log(nodes);
    console.log(name, data);
    return (
      <optgroup label={name} >
        {Object.keys(data).map((key) => {
          return (<option className={JSON.stringify(data[key])} > {key} </option>);
        })}
      </optgroup>
    );
  }

  getOptions() {
    if (this.props.seed === null || this.props.seed.props.pin.type.name.toLowerCase() === 'flow') {
      return Object.keys(nodes).map(key => this.getOptionGroup(key, nodes[key]));
    }
    return this.getOptionGroup(this.props.seed.props.pin.type.name.toLowerCase(), nodes[this.props.seed.props.pin.type.name.toLowerCase()]);
  }

  handleClick() {
    this.setState({
      active: false,
    });
    console.log('clicked');
  }

  handleChange(evt) {
    const data = evt.target.options[evt.target.selectedIndex];
    console.log(JSON.parse(data.className));
    console.log(data);
    const parsed = parseNode(data.value, JSON.parse(data.className));
    const node = new NodeModel(parsed.name, this.props.x, this.props.y, parsed.inPins, parsed.outPins, parsed.compile)
    this.props.handleChange(node);
  }

  render() {
    console.log(this.props.seed);
    if (!this.props.active || !this.state.active) {
      return null;
    }

    return (
      <foreignObject x={this.props.x} y={this.props.y} >
        <select style={{ width: Size.NodeSearcher.width }} name={this.name} onChange={this.handleChange} onClick={(evt) => { evt.preventDefault(); evt.stopPropagation(); }}>
          {this.getOptions()}
        </select>

      </foreignObject>
    );
  }
}

export default NodeSearcher;
