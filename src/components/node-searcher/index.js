import React, { Component } from 'react';

import NodeModel from './../../models/node';

import Size from './../../utils/sizes';

import nodes from './../../nodes/index';
import parseNode from './../../nodes/parser';

import SearchBar from './search-bar';
import Item from './item';

import './style.css';


class NodeSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 0,
      active: true,
      seed: null,
      searchString: '',
    }
    this.name = 'node-searcher';
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  getOptionGroup(name, data) {
    const x = this.name;
    return (
      Object.keys(data).filter(key => key.includes(this.state.searchString)).map((key) => {
        return (<Item handleClick={this.handleClick} data={data[key]} name={key} />);
      })
    );
  }

  getOptions() {
    if (this.props.seed === null || this.props.seed.props.pin.type.name.toLowerCase() === 'flow') {
      return Object.keys(nodes).map(key => this.getOptionGroup(key, nodes[key]));
    }
    return this.getOptionGroup(this.props.seed.props.pin.type.name.toLowerCase(), nodes[this.props.seed.props.pin.type.name.toLowerCase()]);
  }

  handleClick(item) {
    const parsed = parseNode(item.props.name, item.props.data);
    const node = new NodeModel(parsed.name, this.props.x, this.props.y, parsed.inPins, parsed.outPins, parsed.compile)
    this.props.handleChange(node);
  }

  handleSearch(evt) {
    this.setState({
      searchString: evt.target.value,
    });
  }

  handleScroll(evt) {
    evt.stopPropagation();
  }

  render() {
    if (!this.props.active || !this.state.active) {
      return null;
    }
    return (
      <foreignObject x={this.props.x} y={this.props.y - 20} >
        <div className="container" onWheel={this.handleScroll}>
          <SearchBar handleChange={this.handleSearch} value={this.state.searchString} />
          <div className="items-container">
              {this.getOptions()}
          </div>
        </div>
      </foreignObject>
    );
  }
}

export default NodeSearcher;
