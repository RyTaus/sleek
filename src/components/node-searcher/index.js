import React, { Component } from 'react';

import NodeModel from './../../models/node';

import Size from './../../utils/sizes';

import nodes from './../../nodes/index';
import parseNode from './../../nodes/parser';

import SearchBar from './search-bar';
import Item from './item';
import ItemGroup from './item-group';

import './style.css';


class NodeSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      seed: null,
      searchString: '',
    }
    this.name = 'node-searcher';
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  remove() {
    this.setState({
      active: false,
      searchString: '',
    });
  }

  getOptionGroup(name, data) {
    const x = this.name;
    return (<ItemGroup handleClick={this.handleClick} data={data} name={name} searcher={this}/>);
  }

  getOptions() {
    if (this.props.seed === null || this.props.seed.props.pin.type.name.toLowerCase() === 'flow') {
      return Object.keys(nodes).map(key => this.getOptionGroup(key, nodes[key]));
    }
    return this.getOptionGroup(this.props.seed.props.pin.type.name.toLowerCase(), nodes[this.props.seed.props.pin.type.name.toLowerCase()]);
  }

  handleClick(item) {
    const parsed = parseNode(item.props.name, item.props.data);
    const { panX, panY, zoom } = window.frame.state;
    const node = new NodeModel(parsed.name, ((-panX + this.props.x) / zoom), ((-panY + this.props.y) / zoom), parsed.inPins, parsed.outPins, parsed.compile)
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

  componentWillReceiveProps(props) {
    this.setState({
      searchString: '',
    });
  }

  render() {
    if (!this.props.active || !this.state.active) {
      return null;
    }
    return (
      <div className="node-searcher container" onWheel={this.handleScroll} style={{ left: this.props.x, top: this.props.y }}>
        <SearchBar handleChange={this.handleSearch} value={this.state.searchString} />
        <div className="items-container">
            {this.getOptions()}
        </div>
      </div>
    );
  }
}

export default NodeSearcher;
