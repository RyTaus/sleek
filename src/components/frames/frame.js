import React, { Component } from 'react';

import Pin from './../../models/pin';
import NodeModel from './../../models/node';
// import Pin from './../pin';
import { Node } from './../node';
import EventHandler from './../event-handler';
import Sidebar from './sidebar';
import NodeSearcher from './../node-searcher/index';

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
      searcherSeed: null,
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
      searcherX: evt.pageX, // for now
      searcherY: evt.pageY,
      searcherSeed: null,
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

  handleMouseUp(evt) {
    if (this.eventHandler.state === 'drag-pin') {
      console.log('seeding...');
      console.log(this.inFocus);
      this.setState({
        searcherActive: true,
        searcherX: evt.pageX - 200, // for now
        searcherY: evt.pageY,
        searcherSeed: this.eventHandler.inFocus,
      });
    }
    console.log(evt.pageX, evt.pageY);
    evt.preventDefault();
    evt.stopPropagation();
    this.eventHandler.state = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.forceUpdate();
    console.log(this.state.searcherSeed);
  }

  handleScroll(evt) {
    const minZoom = 0.2;
    const maxZoom = 3;
    this.setState({
      zoom: [minZoom, this.state.zoom + (evt.deltaY > 0 ? 0.05 : -0.05), maxZoom].sort()[1],
    });
  }

  handleNodeSearcherSelect(node) {
    this.addNode(node);
    if (this.state.searcherSeed) {
      const a = node.inPins[Object.keys(node.inPins)[0]];
      const b = this.state.searcherSeed.props.pin;
      try {
        if (a.canConnect(b)) {
          a.createConnection(b);
          b.createConnection(a);
        }
        window.frame.forceUpdate();
      } catch (err) {
        window.Console.log(err);
      }
    }
    this.setState({
      searcherActive: false,
    });
    console.log(this);
  }

  /* GRID:
    <defs>
      <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
      </pattern>
      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="800" height="800" fill="url(#smallGrid)" />
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
      </pattern>
    </defs>

    <rect x="-400" y="-400" className="grid" width="1000%" height="1000%" fill="url(#grid)" />
  */

  render() {
    const pins = [];
    this.state.nodeModels.forEach(node => pins.push(...Object.keys(node.inPins).map(key => node.inPins[key])));
    return (
      <div>
        <div style={{ height: `${this.state.heightRatio}%` }}>
          <Sidebar frame={this} height={`${this.state.heightRatio}%`} width={`${100 - this.state.widthRatio}%`} />
          <svg
            className="canvas"
            onContextMenu={this.handleContextMenu}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.eventHandler.onMouseMove}
            onWheel={this.handleScroll}
            strokeLinecap="round"
            width={`${this.state.widthRatio}%`}
            height="600"
          >

            <g transform={`translate(${this.state.panX}, ${this.state.panY}) scale(${this.state.zoom})`}>

              {pins.map(pin => pin.renderConnections())}
              {this.state.nodeModels.map(node => (<Node node={node} />))}
              {this.eventHandler.renderLine()}
            </g>
          </svg>
          <NodeSearcher
            active={this.state.searcherActive}
            seed={this.state.searcherSeed}
            x={this.state.searcherX}
            y={this.state.searcherY}
            handleChange={this.handleNodeSearcherSelect}
          />
        </div>
      </div>
    );
  }
}

export default Frame;
