import React, { Component } from 'react';

/**
 *  Need to do type selection.
 */

export default class AddVariable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: 0,
      isConstant: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleIsConstantChange = this.handleIsConstantChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  handleTypeChange(evt) {
    const index = this.props.types.map(t => t.name).indexOf(evt.target.value)
    console.log(index);
    console.log(this.props.types[index].name);
    this.setState({
      type: index,
    });
  }

  handleIsConstantChange(evt) {
    this.setState({
      isConstant: evt.target.checked,
    });
  }

  handleSubmit() {
    const { name, type, isConstant } = this.state;
    // console.log(this.props.types[type]);
    this.props.handleSubmit(name, new this.props.types[type](), isConstant);
    this.setState({
      name: '',
      isConstant: false,
    });
  }

  render() {
    console.log(this.props.types);
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        <input type="checkbox" checked={this.state.isConstant} onChange={this.handleIsConstantChange} />
        <select onChange={this.handleTypeChange} >
          {this.props.types.map((type, index) => (<option className={index}> {type.name} </option>))}
        </select>
        <input type="button" checked={this.state.isConstant} value="make" onClick={this.handleSubmit} />
      </div>
    );
  }
}
