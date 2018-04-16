import React, { Component } from 'react';

import Pin from './../../models/pin';
import NodeModel from './../../models/node';
// import Pin from './../pin';
import { Node } from './../node';
import EventHandler from './../event-handler';
import Sidebar from './sidebar';
import NodeSearcher from './../node-searcher';

// import { NumLit, BoolLit, StringLit, Flow } from './../../type/type';

import parseNode from './../../nodes/parser';
import nodes from './../../nodes/number';
import nodes2 from './../../nodes/statements';


class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeModels: [],
      widthRatio: 80,
      heightRatio: 75,
      zoom: 1,
      panX: 0,
      panY: -30,
      searcherActive: false,
    };
    window.frame = this;

    this.eventHandler = new EventHandler(this);
    window.eventHandler = this.eventHandler;

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleNodeSearcherSelect = this.handleNodeSearcherSelect.bind(this);

    const parsed = parseNode('add', nodes.add);
    this.addNode(new NodeModel(parsed.name, 40, 100, parsed.inPins, parsed.outPins, parsed.compile))
    const parsed1 = parseNode('add', nodes.add);
    window.NODE = new NodeModel(parsed1.name, 240, 300, parsed1.inPins, parsed1.outPins, parsed1.compile);
    this.addNode(window.NODE)
    const parsed2 = parseNode('if', nodes2.if);
    this.addNode(new NodeModel(parsed2.name, 240, 500, parsed2.inPins, parsed2.outPins, parsed2.compile))

    const parsed3 = parseNode('>', nodes.greaterThan);
    this.addNode(new NodeModel(parsed3.name, 40, 100, parsed3.inPins, parsed3.outPins, parsed3.compile))
    console.log(this.state.nodes);
  }

  addNode(node) {
    this.state.nodeModels.push(node);
    this.setState({
      nodes: this.state.nodes,
    });
  }

  handleMouseDown(evt) {
    this.forceUpdate();
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
    console.log(this.state.nodeModels);
    const pins = [];
    this.state.nodeModels.forEach(node => pins.push(...Object.keys(node.inPins).map(key => node.inPins[key])));
    console.log(pins);
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
              {pins.map(pin => pin.renderConnections())}
              {this.state.nodeModels.map(node => (<Node node={node} />))}
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
