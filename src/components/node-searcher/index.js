import React, { Component } from 'react';

import NodeModel from './../../models/node';

import Size from './../../utils/sizes';

import nodes from './../../nodes/index';
import parseNode from './../../nodes/parser';

import SearchBar from './search-bar';
import Item from './item';

import './style.css';

// import { DropdownButton, }


class NodeSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 0,
      active: true,
      seed: null,
    }
    this.name = 'node-searcher';
    this.handleScroll = this.handleScroll.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.getOptionGroup = this.getOptionGroup.bind(this);
  }

  getOptionGroup(name, data) {
    const x = this.name;
    return (
      Object.keys(data).map((key) => {
        console.log(key);
        return (<Item data={data[key]} name={key} />);
      })
    );
  }

  getOptions() {
    if (this.props.seed === null || this.props.seed.props.pin.type.name.toLowerCase() === 'flow') {
      return Object.keys(nodes).map(key => this.getOptionGroup(key, nodes[key]));
    }
    // return this.getOptionGroup(this.props.seed.props.pin.type.name.toLowerCase(), nodes[this.props.seed.props.pin.type.name.toLowerCase()]);
  }

  handleScroll(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({
      scroll: this.state.scroll - evt.deltaY,
    });
  }


  render() {
    return (
      <foreignObject x={this.props.x} y={this.props.y - 20} >
        <div className="container">
          <SearchBar />
          <div className="items-container" onWheel={this.handleScroll}>
            <div className="items-container-inner" style={{ top: this.state.scroll }}>
              {this.getOptions()}
            </div>
          </div>
        </div>
      </foreignObject>
    );
  }
}

export default NodeSearcher;
