import Node from './node';

const EVENT = {
  DRAG_NODE: 'drag-node',
  DRAG_PIN: 'drag-pin',
  PAN: 'pan',
  NONE: 'none',
};

class EventHandler {
  constructor(frame) {
    this.state = null;
    this.frame = frame;
    // this.onMouseDown = this.onMouseDown.bind(this);
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
    }
  }

  onMouseUp(evt) {
    if (evt.button === 2) { // rmb
      this.state = null;
    }
  }

  onMouseDown(evt, component) {
    if (component instanceof Node) {
      this.state = EVENT.DRAG_NODE;
      this.inFocus = component;
    }
  }

  onPinDown(evt, component) {
    this.state = EVENT.DRAG_PIN;
    this.inFocus = component;
    evt.preventDefault();
    evt.stopPropagation();
  }

  onPinUp(evt, component) {
    if (this.state === EVENT.DRAG_PIN) {
      console.log('up');
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
