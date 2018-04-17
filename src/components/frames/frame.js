import React, { Component } from 'react';

import { Node } from './../node';
import EventHandler from './../event-handler/index';
import Sidebar from './sidebar';
import NodeSearcher from './../node-searcher/index';


class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: props.script,
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
    this.state.script.addNode(node);
    this.setState({
      script: this.state.script,
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
      searcherX: evt.pageX,
      searcherY: evt.pageY,
      searcherSeed: null,
    });
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
      this.setState({
        searcherActive: true,
        searcherX: evt.pageX, // for now
        searcherY: evt.pageY,
        searcherSeed: this.eventHandler.inFocus,
      });
    }
    evt.preventDefault();
    evt.stopPropagation();
    this.eventHandler.state = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.forceUpdate();
  }

  handleScroll(evt) {
    if (this.eventHandler.state !== null) {
      return;
    }
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
  }

  render() {
    const pins = [];
    this.state.script.nodes
      .forEach(node => pins.push(...Object.keys(node.inPins).map(key => node.inPins[key])));
    return (
      <div>
        <div style={{ height: `${this.state.heightRatio}%`, overflow: 'hidden' }}>
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
              {this.state.script.nodes.map(node => (<Node node={node} />))}
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
          <Sidebar frame={this} height={`${this.state.heightRatio}%`} width={`${100 - this.state.widthRatio}%`} />
        </div>
      </div>
    );
  }
}

export default Frame;
