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
    if (this.props.seed) {
      const { pin } = this.props.seed.props;

      const pinToConnect = this.getPinToConnect(node);
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

  componentWillReceiveProps() {
    this.setState({
      searchString: '',
    });
  }

  render() {
    if (!this.props.active || !this.state.active) {
      return null;
    }

    const { width, height } = window.visualViewport;
    const x = this.props.x + 320 > width ? width - 320 : this.props.x;
    const y = this.props.y + 210 > height ? height - 220 : this.props.y;
    console.log(this.props.x, this.props.y);
    console.log(width, height);
    return (
      <div
        className="node-searcher container"
        onWheel={evt => evt.stopPropagation()}
        style={{ left: x, top: y }}
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
