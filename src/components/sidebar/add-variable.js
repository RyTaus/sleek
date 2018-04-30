import React, { Component } from 'react';
import Variable from './../../models/variable';

import { NumLit, StringLit, BoolLit, List, SetLit, Map, Func } from './../../type/type';

import TextInput from './../common/text-input';


/**
 *
 */

export default class AddVariable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: [BoolLit],
      isConstant: false,
      display: 'none',
    };

    this.mapTypeToName = {
      NumLit: 'Number',
      StringLit: 'String',
      BoolLit: 'Boolean',
      List: 'List',
      Func: 'Function',
      Map: 'Map',
      SetLit: 'Set',
    };

    // this.mapNameToType = {
    //   Number: 'NumLit',
    //   String: 'StringLit',
    //   Boolean: 'BoolLit',
    //   List: 'List',
    //   Function: 'Func',
    //   Set: 'Set',
    // };

    this.special = [List, SetLit];

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleIsConstantChange = this.handleIsConstantChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
    this.renderTree = this.renderTree.bind(this);

    this.getValidChildTypes = this.getValidChildTypes.bind(this);
    // this.generateChildSelect = this.generateChildSelect.bind(this);
  }

  getValidChildTypes(type) {
    if ([List, SetLit].includes(type)) {
      return [NumLit, StringLit, BoolLit, List, SetLit, Func];
    }
    if ([Map].includes(type)) {
      return [[NumLit, StringLit, BoolLit], [NumLit, StringLit, BoolLit, List, SetLit, Func]];
    }
    return [];
  }

  // generateChildSelect(type) {
  //   if ([List, SetLit].includes(type)) {
  //     return [NumLit, StringLit, BoolLit, List, SetLit, Func];
  //   }
  // }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  handleTypeChange(evt) {
    // console.log(Object.assign({}, evt));
    let { type } = this.state;
    const id = parseInt(evt.target.id, 10);
    const index = this.props.types.map(t => this.mapTypeToName[t.name]).indexOf(evt.target.value);
    const chosenType = this.props.types[index];

    this.state.type[id] = this.props.types[index];


    if (id === type.length - 1) {
      if (this.special.includes(chosenType)) {
        type.push(BoolLit);
      }
    } else if (!this.special.includes(chosenType)) {
      type = type.slice(0, id + 1);
    }
    this.setState({
      type,
    });
  }


  handleIsConstantChange(evt) {
    this.setState({
      isConstant: evt.target.checked,
    });
  }

  handleSubmit() {
    const { name, type } = this.state;

    const types = type.reverse();
    let result = new (types.shift())();
    while (types.length) {
      result = new (types.shift())(result);
    }

    this.props.handleSubmit(new Variable(name, result));


    this.setState({
      name: '',
      type: [BoolLit],
      display: 'none',
    });
  }

  handleNewClick() {
    if (this.state.display === 'none') {
      this.setState({
        name: '',
        type: [BoolLit],
        isConstant: false,
        display: 'block',
      });
    } else {
      this.setState({
        name: '',
        type: [BoolLit],
        isConstant: false,
        display: 'none',
      });
    }
  }

  renderTree() {
    return (
      <div>
        {this.state.type.map((type, i) => {
          return (
            <select id={i} onChange={this.handleTypeChange} style={{ display: 'block' }}>
              {this.props.types.map((t, index) => (<option className={index}> {this.mapTypeToName[t.name]} </option>))}
            </select>
          );
        })}
      </div>
    );
  }


  render() {
    const isValid = str => (str.length === 0) || /[_$A-z][$[\w]*/.test(str);
    return (
      <div>
        <div className="add-variable-title">
          <span> { this.props.name }</span>
          <button
            onClick={this.handleNewClick}
            className="add-var-button"
          >
            {this.state.display === 'none' ? '+' : '^'}
          </button>
        </div>

        <div className="new-var-popup" style={{ display: this.state.display }}>
          <TextInput
            className="var-name-input"
            value={this.state.name}
            onChange={this.handleNameChange}
            color="white"
            isValid={isValid}
          />

          {this.renderTree()}

          <input type="button" checked={this.state.isConstant} value="make" onClick={this.handleSubmit} />

        </div>
      </div>
    );
  }
}
