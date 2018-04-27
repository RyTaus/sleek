import React from 'react';

import Size from './../../utils/sizes';

import EVENT from './type';

import { Flow, Label, Relative } from './../../type/type'
import { INSTANCE } from './../../type/type-type'
import NodeFactory from './../../library/node-factory';

class EventHandler {
  constructor(frame) {
    this.state = null;
    this.frame = frame;
    this.onMouseMove = this.onMouseMove.bind(this);
    // this.onCanvasContextMenu = this.onCanvasContextMenu.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.dismissSearcher = this.dismissSearcher.bind(this);
    this.dismissContext = this.dismissContext.bind(this);
    this.dismissBoth = this.dismissBoth.bind(this);
  }

  dismissSearcher() {
    this.frame.setState({
      searcherActive: false,
    });
  }

  dismissContext() {
    this.frame.setState({
      contextActive: false,
    });
  }

  dismissBoth() {
    this.dismissContext();
    this.dismissSearcher();
  }

  // onCanvasContextMenu(evt) {
  //   this.state = EVENT.PAN;
  //   this.coords = {
  //     x: evt.pageX,
  //     y: evt.pageY,
  //   };
  //   this.frame.forceUpdate();
  //
  //   evt.preventDefault();
  //   evt.stopPropagation();
  // }

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
      this.coords.x = (-this.frame.state.panX + evt.pageX) / this.frame.state.zoom;
      this.coords.y = (-this.frame.state.panY + (evt.pageY - 25)) / this.frame.state.zoom;
      this.frame.forceUpdate();
    } else if (this.state === EVENT.DRAG_NODE) {
      this.inFocus.handleMouseMove(evt);
    }
  }

  seedContextMenu(evt) {
    console.log(this.inFocus);
    this.frame.setState({
      searcherActive: !this.frame.searcherActive,
      searcherX: evt.pageX, // for now
      searcherY: evt.pageY,
      searcherSeed: this.inFocus,
    });
    this.state = null;

    this.dismissContext();
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
        stroke={this.inFocus.props.pin.getType().color}
      />);
    }
    return null;
  }

  makeGetSetMenu(evt) {
    const variable = this.inFocus;
    const get = new NodeFactory(`get ${variable.name}`)
      .addPin('out', '', variable.type)
      .generateFunction(() => variable.name);

    const set = new NodeFactory(`set ${variable.name}`)
      .addPin('in', ' ', new Flow())
      .addPin('in', 'value', variable.type)
      .addPin('out', 'next', new Flow())
      .addPin('out', 'value', variable.type)
      .generateFunction((node) => {
        return `(${variable.name} = ${node.inPins.value.generate()})`;
      });

    const script = this.frame;
    script.makeContextMenu(evt, [
      {
        text: `get ${variable.name}`,
        onClick: () => script.addNode(get.export(evt.clientX, evt.clientY, script.props.script)),
      },
      {
        text: `set ${variable.name}`,
        onClick: () => script.addNode(set.export(evt.clientX, evt.clientY, script.props.script)),
      },
    ]);
    this.state = null;
    this.inFocus = null;
  }

  onMouseUp(evt) {
    console.log(evt);
    if (this.state === EVENT.DRAG_PIN) {
      this.seedContextMenu(evt);
    } else if (this.state === EVENT.DRAG_VAR) {
      this.makeGetSetMenu(evt);
      this.state = null;
      this.inFocus = null;
    }
  }

  startVariableDrag(variable) {
    this.state = EVENT.DRAG_VAR;
    this.inFocus = variable;
    console.log(this.inFocus);
  }


  onPinDown(evt, component) {
    this.state = EVENT.DRAG_PIN;
    this.coords = component.getPosition();
    this.inFocus = component;
    this.dismissContext();
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
        this.frame.forceUpdate();
      } catch (err) {
        console.log(err);
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
