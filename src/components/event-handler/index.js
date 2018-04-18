import React from 'react';

import Size from './../../utils/sizes';

import EVENT from './type';

class EventHandler {
  constructor(frame) {
    this.state = null;
    this.frame = frame;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onCanvasContextMenu = this.onCanvasContextMenu.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onCanvasContextMenu(evt) {
    this.state = EVENT.PAN;
    this.coords = {
      x: evt.pageX,
      y: evt.pageY,
    };
    evt.preventDefault();
    evt.stopPropagation();
  }

  onMouseMove(evt) {
    if (this.state === EVENT.PAN) {
      const xDiff = this.coords.x - evt.pageX;
      const yDiff = this.coords.y - evt.pageY;

      this.coords.x = evt.pageX;
      this.coords.y = evt.pageY;

      this.frame.setState({
        panX: this.frame.state.panX - xDiff,
        panY: this.frame.state.panY - yDiff,
      });
      evt.preventDefault();
      evt.stopPropagation();
    } else if (this.state === EVENT.DRAG_PIN) {
      this.coords.x = -this.frame.state.panX + (evt.pageX / this.frame.state.zoom); // TODO make relative to sidebar width
      this.coords.y = (-this.frame.state.panY + (evt.pageY / this.frame.state.zoom)) - 20;
      window.frame.forceUpdate();
    } else if (this.state === EVENT.DRAG_NODE) {
      this.inFocus.handleMouseMove(evt);
    }
  }

  seedContextMenu(evt) {
    this.frame.setState({
      searcherActive: true,
      searcherX: evt.pageX, // for now
      searcherY: evt.pageY,
      searcherSeed: this.inFocus.props.pin.type.name.toLowerCase(),
    });
    evt.preventDefault();
    evt.stopPropagation();
  }

  renderLine() {
    if (this.state === EVENT.DRAG_PIN) {
      const offset = (Size.Pin.width / 2);
      const { x, y } = this.inFocus.getPosition();
      return (<line
        className="line"
        x1={x + offset}
        y1={y + offset}
        x2={this.coords.x}
        y2={this.coords.y}
        strokeWidth="4"
        stroke={this.inFocus.props.pin.type.color}
      />);
    }
    return null;
  }

  onMouseUp(evt) {
    if (this.state === EVENT.DRAG_PIN) {
      this.seedContextMenu(evt);
    }
  }


  onPinDown(evt, component) {
    this.state = EVENT.DRAG_PIN;
    this.coords = component.getPosition();
    this.inFocus = component;
    evt.preventDefault();
    evt.stopPropagation();
  }

  onPinUp(evt, component) {
    if (this.state === EVENT.DRAG_PIN) {
      const a = this.inFocus.props.pin;
      const b = component.props.pin;
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
    this.inFocus = null;
    this.state = EVENT.NONE;
    evt.preventDefault();
    evt.stopPropagation();
  }

  onCanvasDown() {
    this.state = EVENT.PAN;
  }
}

export default EventHandler;
