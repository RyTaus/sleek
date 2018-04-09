import React, { Component } from 'react';

import Pin from './../pin';
import { Node, BlackBoxNode } from './../node';
import EventHandler from './../event-handler';
import Sidebar from './sidebar';

import Type from './../../type/type';


class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      widthRatio: 80,
      heightRatio: 75,
      zoom: 1,
      panX: 0,
      panY: -30,
    };


    this.eventHandler = new EventHandler(this);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.addNode(<Node name="node 1" eventHandler={this.eventHandler} x={420} y={100}
      inPins={{ next: (new Pin.FlowPin({})), temp: (new Pin.ValuePin({ type: new Type.NumLit() })) }} />);
    this.addNode(<Node name="node #2" eventHandler={this.eventHandler} x={160} y={100}
      inPins={{ val: new Pin.ValuePin({ type: new Type.NumLit() }), testing: new Pin.DropDownPin({ options: ['a', 'b', 'c'] }) }}
      outPins={{ next: (new Pin.FlowPin({})) }} />);
    this.addNode(<BlackBoxNode name="this is node 3" eventHandler={this.eventHandler} x={120} y={200}
      inPins={{ val: new Pin.ValuePin({ type: new Type.StringLit() }), testing: new Pin.DropDownPin({ options: ['a', 'b', 'c'] }) }}
      outPins={{ next: (new Pin.ValuePin({ type: new Type.NumLit() })) }} />);
  }

  addNode(node) {
    this.state.nodes.push(node);
    this.setState({
      nodes: this.state.nodes,
    });
  }

  handleMouseDown(evt) {
    this.coords = {
      x: evt.pageX,
      y: evt.pageY,
    };
    console.log(this.coords);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(evt) {
    const xDiff = this.coords.x - evt.pageX;
    const yDiff = this.coords.y - evt.pageY;

    this.coords.x = evt.pageX;
    this.coords.y = evt.pageY;
    console.log(xDiff, yDiff);

    // this.state.panX = this.state.panX;
    this.setState({
      panX: this.state.panX - xDiff,
      panY: this.state.panY - yDiff,
    });
    this.forceUpdate();

    evt.preventDefault();
  }

  handleMouseUp() {
    console.log(this.state);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleScroll(evt) {
    // console.log(evt);
    const minZoom = 0.2;
    const maxZoom = 3;
    this.setState({
      zoom: [minZoom, this.state.zoom + (evt.deltaY > 0 ? 0.05 : -0.05), maxZoom].sort()[1],
    })
  }

  render() {
    return (
      <div>
        <div style={{ height: `${this.state.heightRatio}%` }}>
          <Sidebar frame={this} height={`${this.state.heightRatio}%`} width={`${100 - this.state.widthRatio}%`} />
          <svg
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onWheel={this.handleScroll}
            strokeLinecap="round"
            preserveAspectRatio="none"
            width={`${this.state.widthRatio}%`}
            height={`600`}>
            <g transform={`translate(${this.state.panX}, ${this.state.panY}) scale(${this.state.zoom})`}>
              {this.state.nodes}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default Frame;
