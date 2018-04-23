import React, { Component } from 'react';


import nodes from './../../library/index';

import SearchBar from './search-bar';
import ItemGroup from './item-group';

import { FLOW } from './../../type/type-type';


import './style.css';


class NodeSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      searchString: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  remove() {
    this.setState({
      active: false,
      searchString: '',
    });
  }

  getOptionGroup(type, data) {
    return (<ItemGroup handleClick={this.handleClick} data={data} name={type} searcher={this} />);
  }

  getOptions() {
    if (this.props.seed === null) {
      return Object.keys(nodes).map(key => this.getOptionGroup(key, nodes[key]));
    }
    const seedType = this.props.seed.props.pin.type;
    if (seedType.name === FLOW) {
      return Object.keys(nodes).map(key => this.getOptionGroup(key, nodes[key]));
    }

    return this.getOptionGroup(seedType.name.toLowerCase(), nodes[seedType.name.toLowerCase()]);
  }

  handleClick(item) {
    const { panX, panY, zoom } = this.props.script.state;
    const x = ((-panX + this.props.x) / zoom);
    const y = ((-panY + this.props.y) / zoom);

    // const node = new NodeModel(parsed.name, x, y, parsed.inPins, parsed.outPins, parsed.compile);
    const node = item.props.data.export(x, y);
    this.props.handleChange(node);
  }

  handleSearch(evt) {
    this.setState({
      searchString: evt.target.value,
    });
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
      <div
        className="node-searcher container"
        onWheel={evt => evt.stopPropagation()}
        style={{ left: this.props.x, top: this.props.y }}
      >
        <SearchBar handleChange={this.handleSearch} value={this.state.searchString} />
        <div className="items-container">
          {this.getOptions()}
        </div>
      </div>
    );
  }
}

export default NodeSearcher;
