class Pin {
  constructor(name, type, connections, defaultValue = '') {
    this.name = name;
    this.type = type;
    this.connections = connections;
    this.value = defaultValue;
  }

  init(node, direction) {
    this.direction = direction;
    this.node = node;
    this.props.name = name;
    this.props.key = key;

    this.maxConnections = this.direction === Direction.in ? 1 : Infinity;
    if (this.pinType === PinType.flow) {
      this.maxConnections = this.direction === Direction.in ? Infinity : 1;
    }

    return this;
  }
}
