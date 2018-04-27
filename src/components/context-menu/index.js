import React, { Component } from 'react';

import './styles.css';

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.name = 'context-menu'
  }

  render() {
    console.log(this.props.options);
    return (
      <div
        className={this.name}
        style={{
          left: this.props.x,
          top: this.props.y,
        }}
      >
        {this.props.options.map((opt) => {
          if (opt === 'divider') {
            return (
              <div>
                <div className="context-divider-top" />
                <div className="context-divider-bot" />
              </div>
            );
          }
          return (<div className="context-option" onClick={opt.onClick}> {opt.text} </div>)
        })}
      </div>
    )
  }
}

export default ContextMenu;
