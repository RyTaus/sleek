import React, { Component } from 'react';
import TextInput from './../common/text-input';
import DropDownInput from './../common/dropdown-input';

import Pin from './../pin';


import Node from './../node';
import EventHandler from './../event-handler';


class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
    this.eventHandler = new EventHandler();
    this.addNode(<Node x="220" y="200" inPins={{ val: (new Pin.ValuePin({})) }} />);
    this.addNode(<Node x="20" y="17" inPins={{ val: new Pin.ValuePin({}), testing: new Pin.DropDownPin({}) }} outPins={{ next: (new Pin.ValuePin({})) }} />);
  }

  addNode(node) {
    this.setState({
      nodes: this.state.nodes.push(node),
    });
  }


  render() {
    return (
      <div>
        <svg width={400} height={400} viewBox="0 0 400 400" ref={(ref) => { this.svg = ref; }}>
          {this.state.nodes.map(node => node)}
        </svg>
      </div>
    );
  }
}

export default Frame;
