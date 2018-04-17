import React, { Component } from 'react';

import Pin from './pin';
import Size from './../utils/sizes';


class Node extends Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  handleMouseDown(evt) {
    this.coords = {
      x: evt.pageX,
      y: evt.pageY,
    };
    // document.addEventListener('mousemove', this.handleMouseMove);
    window.eventHandler.state = 'drag-node';
    window.eventHandler.inFocus = this;
    evt.preventDefault();
    evt.stopPropagation()
  }
  
  // Move to back of list so that it is on top!
  handleMouseMove(evt) {
    const xDiff = this.coords.x - evt.pageX;
    const yDiff = this.coords.y - evt.pageY;

    this.coords.x = evt.pageX;
    this.coords.y = evt.pageY;

    this.props.node.x -= xDiff * (1 / window.frame.state.zoom);
    this.props.node.y -= yDiff * (1 / window.frame.state.zoom);
    window.frame.forceUpdate();

    evt.preventDefault();
    evt.stopPropagation()
  }

  handleContextMenu(evt) {
    window.frame.setState({
      nodeModels: window.frame.state.nodeModels.filter(nm => nm !== this.props.node),
    });
    this.props.node.remove();
    window.eventHandler.state = null;
    evt.preventDefault();
    evt.stopPropagation()
  }

  render() {
    const { node } = this.props;
    const { x, y } = node;
    // const x = Math.round(node.x / 10) * 10;
    // const y = Math.round(node.y / 10) * 10;
    return (
      <g>
        <rect
          className="node"
          x={x}
          y={y}
          width={Size.Node.width}
          height={Size.Node.topLabel + Size.Node.botMargin + (Math.max(Object.keys(node.inPins).length, Object.keys(node.outPins).length) * Size.Pin.perPin)}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onDoubleClick={this.handleDoubleClick}
          onContextMenu={this.handleContextMenu}
        />
        <rect
          className="node node-label-bg"
          x={x + 1}
          y={y + 1}
          width={Size.Node.width - 2}
          height={Size.Node.topLabel - 7}
        />
        <text
          className="node-label"
          y={y + Size.Pin.width + 4}
          x={x + (Size.Node.width / 2)}
          width={Size.Node.width}
          textAnchor="middle"
        >
          {node.name}
        </text>
        {Object.keys(node.inPins).map((pin, i) => (<Pin pin={node.inPins[pin]} x={x} y={y} index={i} />))}
        {Object.keys(node.outPins).map((pin, i) => (<Pin pin={node.outPins[pin]} x={x} y={y} index={i} />))}
      </g>
    );
  }
}

class BlackBoxNode extends Node {
  constructor(props) {
    super(props);
    this.type = 'bb';
    this.className = 'node bb-node';
  }

  handleDoubleClick(evt) {
    console.log('bb node clicked');
  }
}



export { Node, BlackBoxNode };
export default Node;
