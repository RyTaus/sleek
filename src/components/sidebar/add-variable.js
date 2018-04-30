import React, { Component } from 'react';
import Variable from './../../models/variable';

import { BoolLit, List, SetLit } from './../../type/type';

import TextInput from './../common/text-input';


/**
 *
 */

export default class AddVariable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: BoolLit,
      subType: BoolLit,
      isConstant: false,
      display: 'none',
    };

    this.mapTypeToName = {
      NumLit: 'Number',
      StringLit: 'String',
      BoolLit: 'Boolean',
      List: 'List',
      Func: 'Function',
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

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubTypeChange = this.handleSubTypeChange.bind(this);
    this.handleIsConstantChange = this.handleIsConstantChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
    this.renderTree = this.renderTree.bind(this);
  }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  handleTypeChange(evt) {
    const index = this.props.types.map(t => this.mapTypeToName[t.name]).indexOf(evt.target.value);
    this.setState({
      type: this.props.types[index],
    });
  }

  handleSubTypeChange(evt) {
    const index = this.props.types.map(t => this.mapTypeToName[t.name]).indexOf(evt.target.value);
    this.setState({
      subType: this.props.types[index],
    });
  }

  handleIsConstantChange(evt) {
    this.setState({
      isConstant: evt.target.checked,
    });
  }

  handleSubmit() {
    const { name, type, subType } = this.state;
    if ([List, SetLit].includes(this.state.type)) {
      this.props.handleSubmit(new Variable(name, new type(new subType())));
    } else {
      this.props.handleSubmit(new Variable(name, new type()));
    }
    this.setState({
      name: '',
      isConstant: false,
      display: 'none',
    });
  }

  handleNewClick() {
    if (this.state.display === 'none') {
      this.setState({
        display: 'block',
      });
    } else {
      this.setState({
        display: 'none',
      });
    }
  }

  renderTree() {
    if ([List, SetLit].includes(this.state.type)) {
      return (
        <select onChange={this.handleSubTypeChange} >
          {this.props.types.map((type, index) => (<option className={index}> {this.mapTypeToName[type.name]} </option>))}
        </select>
      );
    }
    return null;
  }

  // <input
  //   type="checkbox"
  //   checked={this.state.isConstant}
  //   onChange={this.handleIsConstantChange}
  // />

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

          <select onChange={this.handleTypeChange} >
            {this.props.types.map((type, index) => (<option className={index}> {this.mapTypeToName[type.name]} </option>))}
          </select>
          <input type="button" checked={this.state.isConstant} value="make" onClick={this.handleSubmit} />
          {this.renderTree()}
        </div>
      </div>
    );
  }
}
