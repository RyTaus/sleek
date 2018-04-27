import React, { Component } from 'react';

import { Node } from './node';
import EventHandler from './event-handler/index';
import Sidebar from './sidebar/index';
import NodeSearcher from './node-searcher/index';
import ContextMenu from './context-menu/index';


export default class Script extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: props.script,
      widthRatio: 80,
      heightRatio: 75,
      zoom: 1,
      panX: 0,
      panY: 0,
      contextActive: false,
      contextOptions: [],
      searcherActive: false,
      searcherSeed: null,

      width: 0,
      height: 0,
    };

    this.eventHandler = new EventHandler(this);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleNodeSearcherSelect = this.handleNodeSearcherSelect.bind(this);
    this.handleDragPinUp = this.handleDragPinUp.bind(this);


    this.makeContextMenu = this.makeContextMenu.bind(this);
    this.dismissContextMenu = this.dismissContextMenu.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.addVariable = this.addVariable.bind(this);
  }

  addVariable(type, variable) {
    this.state.script[type](variable);
    this.setState({
      script: this.state.script,
    });
  }

  addNode(node) {
    this.state.script.addNode(node);
    this.setState({
      script: this.state.script,
    });
  }

  handleMouseDown(evt) {
    this.eventHandler.dismissBoth();

    this.forceUpdate();

    if (evt.button === 0 && evt.target.className.baseVal === 'canvas') {
      this.coords = {
        x: evt.pageX,
        y: evt.pageY,
      };
      console.log('FIRING...');
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }

  makeContextMenu(evt, options) {
    this.setState({
      contextActive: true,
      contextOptions: options,
      contextX: evt.clientX,
      contextY: evt.clientY,
      dismiss: this.eventHandler.dismissBoth,
    });
  }

  dismissContextMenu() {
    this.setState({
      contextActive: false,
    });
  }

  handleContextMenu(evt) {
    console.log(this.state.searcherActive);
    this.setState({
      searcherActive: !this.state.searcherActive,
      contextActive: false,
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

  handleDragPinUp(evt) {
    if (this.eventHandler.state === 'drag-pin') {
      this.setState({
        searcherActive: true,
        searcherX: evt.pageX, // for now
        searcherY: evt.pageY,
        searcherSeed: this.eventHandler.inFocus,
      });
      this.eventHandler.state = null;
      this.eventHandler.inFocus = null;
    }
  }

  handleMouseUp(evt) {
    if (this.eventHandler.state === 'drag-pin') {
      this.setState({
        searcherActive: true,
        searcherX: evt.pageX, // for now
        searcherY: evt.pageY,
        searcherSeed: this.eventHandler.inFocus,
      });
      this.eventHandler.state = null;
      this.eventHandler.inFocus = null;
    }
    evt.preventDefault();
    evt.stopPropagation();
    this.eventHandler.state = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.forceUpdate();
  }

  handleScroll(evt) {
    if (this.eventHandler.state !== null) {
      return;
    }
    this.eventHandler.dismissBoth();
    const minZoom = 0.2;
    const maxZoom = 3;
    this.setState({
      zoom: [minZoom, this.state.zoom + (evt.deltaY > 0 ? -0.05 : 0.05), maxZoom].sort()[1],
    });
  }

  handleNodeSearcherSelect(node) {
    this.addNode(node);

    this.setState({
      searcherActive: false,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      script: props.script,
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.visualViewport.width, height: window.visualViewport.height });
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
            onMouseMove={this.eventHandler.onMouseMove}
            onMouseUp={this.eventHandler.onMouseUp}
            onWheel={this.handleScroll}
            strokeLinecap="round"
            height={`${(this.state.heightRatio / 95) * this.state.height}`}
            width={`${(this.state.widthRatio / 100) * this.state.width}`}
          >
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 108" fill="none" stroke="#222" strokeWidth="0.5" />
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#111" strokeWidth="1" />
              </pattern>
            </defs>

            <g transform={`translate(${this.state.panX}, ${this.state.panY}) scale(${this.state.zoom})`}>
              <rect className="grid" width="1000%" height="1000%" x="-4000" y="-4000"fill="url(#grid)" />

              {pins.map(pin => pin.renderConnections())}
              {this.state.script.nodes.map(node => (<Node node={node} script={this} />))}
              {this.eventHandler.renderLine()}
            </g>
          </svg>
          <NodeSearcher
            active={this.state.searcherActive}
            seed={this.state.searcherSeed}
            x={this.state.searcherX}
            y={this.state.searcherY}
            handleChange={this.handleNodeSearcherSelect}
            script={this}
          />
          <ContextMenu
            active={this.state.contextActive}
            options={this.state.contextOptions}
            x={this.state.contextX}
            y={this.state.contextY}
            dismiss={this.state.dismiss}
          />
          <Sidebar
            script={this}
            addVariable={this.addVariable}
            addInput={this.addInput}
            addOutput={this.addOutput}
            variables={this.state.script.variables}
            types={this.state.script.getTypes()}
            height={`${this.state.heightRatio + 2}%`}
            width={`${100 - this.state.widthRatio}%`}
          />
        </div>
      </div>
    );
  }
}
