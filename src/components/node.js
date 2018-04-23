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
    this.props.script.eventHandler.state = 'drag-node';
    this.props.script.eventHandler.inFocus = this;
    evt.preventDefault();
    evt.stopPropagation()
  }

  // Move to back of list so that it is on top!
  handleMouseMove(evt) {
    const xDiff = this.coords.x - evt.pageX;
    const yDiff = this.coords.y - evt.pageY;

    this.coords.x = evt.pageX;
    this.coords.y = evt.pageY;

    this.props.node.x -= xDiff * (1 / this.props.script.state.zoom);
    this.props.node.y -= yDiff * (1 / this.props.script.state.zoom);
    this.props.script.forceUpdate();

    evt.preventDefault();
    evt.stopPropagation()
  }

  handleContextMenu(evt) {
    // MOVE THIS INTO EVENT-HANDLER. THESE SHOULD JUST CALL ITS... NEED FOR MULTIPLE FILES
    this.props.script.state.script.removeNode(this.props.node);

    this.props.script.eventHandler.state = null;
    evt.preventDefault();
    evt.stopPropagation();
  }

  render() {
    const { node } = this.props;
    const { x, y } = node;
    const bodyHeight = (Math.max(Object.keys(node.inPins).length, Object.keys(node.outPins).length) * Size.Pin.perPin)
    return (
      <g>
        <rect
          className="node"
          x={x}
          y={y}
          width={Size.Node.width}
          height={Size.Node.topLabel + Size.Node.botMargin + bodyHeight}
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
        {Object.keys(node.inPins).map((pin, i) => (<Pin pin={node.inPins[pin]} x={x} y={y} index={i} script={this.props.script} />))}
        {Object.keys(node.outPins).map((pin, i) => (<Pin pin={node.outPins[pin]} x={x} y={y} index={i} script={this.props.script} />))}
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
