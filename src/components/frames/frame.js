import React, { Component } from 'react';

import Pin from './../pin';
import { Node, BlackBoxNode } from './../node';
import EventHandler from './../event-handler';
import Sidebar from './sidebar';
import NodeSearcher from './../node-searcher';

import { NumLit, BoolLit, StringLit, Flow } from './../../type/type';

import parseNode from './../../nodes/parser'
import nodes from './../../nodes/number'


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
      searcherActive: false,
    };


    this.eventHandler = new EventHandler(this);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleNodeSearcherSelect = this.handleNodeSearcherSelect.bind(this);

    this.addNode(<Node name="node 1" eventHandler={this.eventHandler} x={420} y={100}
      inPins={{ next: (new Pin({ type: new Flow() })), temp: (new Pin({ type: new NumLit() })) }} />);
    this.addNode(<Node name="node #2" eventHandler={this.eventHandler} x={160} y={100}
      inPins={{ val: new Pin({ type: new NumLit() }), testing: new Pin({ options: ['a', 'b', 'c'], type: new NumLit() }) }}
      outPins={{ next: (new Pin({ type: new Flow() })) }} />);
    this.addNode(<BlackBoxNode name="this is node 3" eventHandler={this.eventHandler} x={120} y={200}
      inPins={{ val: new Pin({ type: new StringLit() }), testing: new Pin({ options: ['a', 'b', 'c'], type: new NumLit() }) }}
      outPins={{ next: (new Pin({ type: new NumLit() })) }} />);

    const parsed = parseNode('add', nodes.add);
    this.addNode(<Node name={parsed.name} eventHandler={this.eventHandler} x={0} y={0}
      inPins={parsed.inPins} outPins={parsed.outPins} />)
  }

  addNode(node) {
    this.state.nodes.push(node);
    this.setState({
      nodes: this.state.nodes,
    });
  }

  handleMouseDown(evt) {
    if (evt.button === 0 && evt.target.className.baseVal === 'canvas') {
      this.coords = {
        x: evt.pageX,
        y: evt.pageY,
      };
      document.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleContextMenu(evt) {
    this.setState({
      searcherActive: !this.state.searcherActive,
      searcherX: evt.pageX - 200, // for now
      searcherY: evt.pageY,
    });
    console.log(evt.pageX, evt.pageY);
    evt.preventDefault();
    evt.stopPropagation();
  }

  handleMouseMove(evt) {
    const xDiff = this.coords.x - evt.pageX;
    const yDiff = this.coords.y - evt.pageY;

    this.coords.x = evt.pageX;
    this.coords.y = evt.pageY;

    this.setState({
      panX: this.state.panX - xDiff,
      panY: this.state.panY - yDiff,
    });
    this.forceUpdate();

    evt.preventDefault();
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleScroll(evt) {
    const minZoom = 0.2;
    const maxZoom = 3;
    this.setState({
      zoom: [minZoom, this.state.zoom + (evt.deltaY > 0 ? 0.05 : -0.05), maxZoom].sort()[1],
    });
  }

  handleNodeSearcherSelect(node) {
    // this.addNode(node);
    this.setState({
      searcherActive: false,
    });
    console.log(this);
  }

  render() {
    return (
      <div>
        <div style={{ height: `${this.state.heightRatio}%` }}>
          <Sidebar frame={this} height={`${this.state.heightRatio}%`} width={`${100 - this.state.widthRatio}%`} />
          <svg
            className="canvas"
            onContextMenu={this.handleContextMenu}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onWheel={this.handleScroll}
            strokeLinecap="round"
            width={`${this.state.widthRatio}%`}
            height="600"
          >
            <g transform={`translate(${this.state.panX}, ${this.state.panY}) scale(${this.state.zoom})`}>
              {this.state.nodes}
            </g>
            <NodeSearcher
              active={this.state.searcherActive}
              x={this.state.searcherX}
              y={this.state.searcherY}
              handleChange={this.handleNodeSearcherSelect}
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default Frame;
