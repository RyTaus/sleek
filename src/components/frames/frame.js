import React, { Component } from 'react';

import Pin from './../pin';
import { Node, BlackBoxNode } from './../node';
import EventHandler from './../event-handler';
import Sidebar from './sidebar';
import Console from './console';

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      widthRatio: 80,
      heightRatio: 75,
    };
    this.eventHandler = new EventHandler();
    this.addNode(<Node name="node 1" eventHandler={this.eventHandler} x={220} y={100} inPins={{ next: (new Pin.FlowPin({})), temp: (new Pin.ValuePin({ type: 'test' })) }} />);
    this.addNode(<Node name="node #2"eventHandler={this.eventHandler} x={-60} y={100} inPins={{ val: new Pin.ValuePin({ type: 'test' }), testing: new Pin.DropDownPin({ options: ['a', 'b', 'c'] }) }} outPins={{ next: (new Pin.FlowPin({})) }} />);
    this.addNode(<BlackBoxNode name="this is node 3"eventHandler={this.eventHandler} x={20} y={200} inPins={{ val: new Pin.ValuePin({ type: 'test' }), testing: new Pin.DropDownPin({ options: ['a', 'b', 'c'] }) }} outPins={{ next: (new Pin.ValuePin({})) }} />);
  }

  addNode(node) {
    this.state.nodes.push(node);
    this.setState({
      nodes: this.state.nodes,
    });
  }


  render() {
    return (
      <div>
        <div style={{ height: `${this.state.heightRatio}%` }}>
          <Sidebar frame={this} height={`${this.state.heightRatio}%`} width={`${100 - this.state.widthRatio}%`} />
          <svg stroke-linecap="round" preserveAspectRatio="none" width={`${this.state.widthRatio}%`} height={`500` } style={{ width: `${this.state.widthRatio}%`, height: `${this.state.heightRatio}%` }} ref={(ref) => { this.svg = ref; }}>
            {this.state.nodes}
          </svg>
        </div>
        <Console height={`${100 - this.state.heightRatio - 5}%`} />
      </div>
    );
  }
}

export default Frame;
