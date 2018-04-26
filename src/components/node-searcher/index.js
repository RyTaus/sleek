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
    const { pin } = this.props.seed.props;

    const validNodes = this.filterOptions(pin);
    return Object.keys(validNodes).map(key => this.getOptionGroup(key, validNodes[key]));
  }

  filterOptions(pin) {
    const self = this;

    const result = {};
    Object.keys(nodes).forEach((key) => {
      const type = nodes[key];
      const validNodes = {};
      Object.keys(type).forEach((k) => {
        const node = type[k];
        if (node.filter(pin)) {
          validNodes[k] = node
        }
      });
      result[key] = validNodes;
    });
    return result;
  }

  handleClick(item) {
    const { panX, panY, zoom } = this.props.script.state;
    const { script } = this.props.script.props;
    const x = ((-panX + this.props.x) / zoom);
    const y = ((-panY + this.props.y) / zoom);

    // const node = new NodeModel(parsed.name, x, y, parsed.inPins, parsed.outPins, parsed.compile);
    const node = item.props.data.export(x, y, script);
    console.log(this.props.seed);
    if (this.props.seed) {
      const { pin } = this.props.seed.props;
      console.log(pin);

      const pinToConnect = this.getPinToConnect(node);
      console.log(pinToConnect);
      pin.createConnection(pinToConnect);
      pinToConnect.createConnection(pin);
    }
    this.props.handleChange(node);
  }

  getPinToConnect(node) {
    const { pin } = this.props.seed.props;
    const direction = { in: 'outPins', out: 'inPins' }[pin.direction];
    console.log(this.props);
    const pins = node[direction];
    console.log(Object.keys(pins));
    return Object.keys(pins)
      .map(key => pins[key])
      .filter((p) => {
        try {
          return p.canConnect(pin)
        } catch (e) {
          return false;
        }
      })[0];
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
