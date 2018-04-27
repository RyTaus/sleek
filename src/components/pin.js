import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from './common/text-input';
import Checkbox from './common/checkbox';
import DropDownInput from './common/dropdown-input';

import Direction from './../utils/direction';
import Size from './../utils/sizes';
import { Type } from './../type/type';
import { NUMBER, FLOW, STRING, BOOLEAN, TYPE, LABEL } from './../type/type-type';


class Pin extends Component {
  constructor(props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /*  RENDER LOGIC */
  getPosition() {
    return {
      x: this.props.x + (this.props.pin.direction === Direction.in ?
        Size.Pin.border :
        Size.Node.width - Size.Pin.width - Size.Pin.border),
      y: this.props.y + Size.Node.topLabel + (Size.Pin.perPin * this.props.index),
    };
  }

  onMouseUp(evt) {
    this.props.script.eventHandler.onPinUp(evt, this);
  }

  onChange(evt) {
    if (this.props.pin.getType().name === BOOLEAN) {
      if (/^-?\d*\.?\d*$/.test(evt.target.value)) {
        this.props.pin.value = evt.target.value;
      }
    } else {
      this.props.pin.value = evt.target.value;
    }
    this.props.script.forceUpdate();
    return true;
  }

  onMouseDown(evt) {
    if (evt.nativeEvent.which === 1) {
      this.props.script.eventHandler.dismissBoth();
      this.props.script.eventHandler.onPinDown(evt, this);
    }
  }

  onContextMenu(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const { pin, script } = this.props;

    const options = pin.connections.map((connection) => {
      return {
        text: `remove ${connection.toString()}`,
        onClick: () => {
          pin.removeConnection(connection);
          script.forceUpdate();
        },
      };
    });
    if (options.length !== 0) {
      options.unshift('divider');
    }
    options.unshift({
      text: 'remove all connections',
      onClick: () => {
        pin.removeAllConnections();
        script.forceUpdate();
      },
    });

    script.makeContextMenu(evt, options);
  }

  // Since they are offset by a g they need nodes x
  renderConnections() {
    const { x, y } = this.getPosition();
    const { pin: pinModel } = this.props;
    if (pinModel.direction === Direction.in) {
      return null;
    }
    return (
      pinModel.connections.map((pin) => {
        const other = pin.getPosition();
        const offset = (Size.Pin.width / 2);
        return (<line
          className={`${this.pinType}-line`}
          x1={x + offset}
          y1={y + offset}
          x2={other.x + offset}
          y2={other.y + offset}
          strokeWidth="4"
          stroke={pin.getType().color}
        />);
      })
    );
  }

  renderFlow() {
    const { x, y } = this.getPosition();
    const { pin } = this.props;

    return (
      <polygon
        className={`pin flow ${pin.isConnected() ? 'connected' : ''}`}
        points={`${x},${y} ${x + Size.Pin.width},${y + (Size.Pin.width / 2)} ${x},${y + Size.Pin.width}`}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onContextMenu={this.onContextMenu}
      />
    );
  }

  renderLine() {
    const offset = (Size.Pin.width / 2);
    const { x, y } = this.getPosition();
    return (<line
      className="line"
      x1={x + offset}
      y1={y + offset}
      x2={this.props.script.eventHandler.x + offset}
      y2={this.props.script.eventHandler.y + offset}
      strokeWidth="4"
      stroke={this.props.pin.getType().color}
    />);
  }

  renderPin() {
    if (this.props.pin.getType().name === FLOW) {
      return this.renderFlow();
    }
    return this.renderValue();
  }

  renderLabel() {
    const { x, y } = this.getPosition();
    const inOffsetFactor = this.props.pin.isConnected() ? 2 : 3;
    return (
      <text
        x={x + (this.props.pin.direction === Direction.in ? Size.Pin.width * inOffsetFactor : -Size.Pin.width)}
        y={y + (Size.Pin.width * 0.75)}
        textAnchor={this.props.pin.direction === Direction.in ? 'start' : 'end'}
      >
        {this.props.pin.name}
      </text>
    );
  }

  renderInput() {
    const { x, y } = this.getPosition();
    const { pin } = this.props;
    const type = pin.getType();
    if ([NUMBER, STRING].includes(type.name)) {
      return (
        <foreignObject x={x} y={y} width="70" height="30" style={{ position: 'fixed' }} >
          <TextInput
            className="pin"
            onMouseUp={this.onMouseUp}
            onChange={this.onChange}
            color={type.color}
            value={pin.value}
          />
        </foreignObject>
      );
    } else if (pin.getType().name === BOOLEAN) {
      const onChange = ((evt) => { pin.value = evt.target.checked; this.props.script.forceUpdate(); });
      return (
        <foreignObject x={x} y={y} width="90" height="30">
          <Checkbox
            className="pin checkbox check-input"
            onMouseUp={this.onMouseUp}
            onChange={onChange}
            checked={pin.value}
            color={type.color}
          />
        </foreignObject>
      );
    } else if (type.name === TYPE) {
      const { script } = this.props.script.state;
      const onSelect = (Selected) => {
        pin.value = new Selected();
        this.props.script.forceUpdate();
      };
      return (
        <foreignObject x={x} y={y} width="60" height="20">
          <DropDownInput
            options={script.getTypes()}
            mapOptionToDisplay={opt => opt.name}
            mapDisplayToOption={disp => script.types[script.types.map(t => t.name).indexOf(disp)]}
            onSelect={onSelect}
            color={type.color}
            value={pin.value}
          />
        </foreignObject>
      );
    } else if (type.name === LABEL) {
      const { script } = this.props.script.state;
      const onSelect = (selected) => {
        pin.value = selected;
        this.props.script.forceUpdate();
      };
      return (
        <foreignObject x={x} y={y} width="60" height="20">
          <DropDownInput
            options={Object.keys(script.getVariables())}
            mapOptionToDisplay={opt => opt}
            mapDisplayToOption={disp => script.getVariables()[disp]}
            onSelect={onSelect}
            color={type.color}
            value={pin.value}
          />

        </foreignObject>
      );
    }

    return this.renderBox();
  }

  renderValue() {
    const { pin } = this.props;
    if (!pin.isConnected() && pin.direction === Direction.in) {
      return this.renderInput();
    }
    return this.renderBox();
  }

  renderBox() {
    const { pin } = this.props;
    const { x, y } = this.getPosition();

    return (
      <g>
        <rect
          className={`pin ${pin.isConnected() ? 'connected' : ''}`}
          x={x}
          y={y}
          style={{ stroke: pin.getType().color, fill: pin.getType().color }}
          width={Size.Pin.width}
          height={Size.Pin.width}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onContextMenu={this.onContextMenu}
        />
      </g>
    );
  }


  render() {
    return (
      <g>
        {this.renderPin()}
        {this.renderLabel()}
      </g>
    );
  }
}

Pin.defaultProps = {
  key: 0,
  name: 'pin',
  connections: [],
  type: new Type('null'),
};

Pin.propTypes = {
  key: PropTypes.number,
  name: PropTypes.string,
  connections: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.instanceOf(Type),
};

export default Pin;
