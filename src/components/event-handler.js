import Node from './node';

const EVENT = {
  DRAG_NODE: 'drag-node',
  DRAG_PIN: 'drag-pin',
  NONE: 'none',
};

class EventHandler {
  constructor() {
    this.state = null;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(evt, component) {
    if (component instanceof Node) {
      this.state = EVENT.DRAG_NODE;
      this.inFocus = component;
      console.log('mousedown node');
    }
  }

  onPinDown(evt, component) {
    console.log('pin down');
    this.state = EVENT.DRAG_PIN;
    this.inFocus = component;
  }

  onPinUp(evt, component) {
    console.log('pin up');
    if (this.state === EVENT.DRAG_PIN) {
      if (this.inFocus.canConnect(component)) {
        this.inFocus.createConnection(component);
        component.createConnection(this.inFocus);
      }
    }
    this.inFocus = null;
    this.state = EVENT.NONE;
  }

  onMouseMove(evt, component) {
    console.log('moving...');
    if (this.state === EVENT.DRAG_NODE) {
      console.log('moving node: ', this.inFocus);
      // TODO calculate actual distance to move.
      this.inFocus.move(4, 4);
    }
  }

  onMouseUp(evt, component) {
    if (this.state === EVENT.DRAG_NODE || this.state === EVENT.DRAG_PIN) {
      this.state = EVENT.NONE;
      console.log('stop moving');
    }
  }
}

export default EventHandler;
