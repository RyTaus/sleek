import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import TextInput from './../common/text-input';
import DropDownInput from './../common/dropdown-input';

import Pin from './../pin';



import Node from './../node';
import EventHandler from './../event-handler';


class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
    this.eventHandler = new EventHandler();
    this.addNode(<Node x="20" />);
    this.addNode(<Node x="20" y="17" inPins={[<Pin />]}/>);
  }

  addNode(node) {
    this.setState({
      nodes: this.state.nodes.push(node),
    });
  }


  render() {
    return (
      <div onMouseMove={this.eventHandler.onMouseMove} onMouseEnter={() => { console.log(this.svg); }}>
        <svg width={400} height={400} viewBox="0 0 400 400" ref={(ref) => { this.svg = ref; }}>
          {this.state.nodes.map(node => node)}
          <TextInput x={200} y={100} isValid={s => !s.includes('t')} />
          <DropDownInput x={200} y={300} options={['i', 'am', 'coolest']} />

        </svg>
      </div>
    );
  }
}

export default Frame;
