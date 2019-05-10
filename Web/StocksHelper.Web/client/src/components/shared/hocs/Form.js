import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = stateFromChildren(this.props.children);
  }

  onChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.onSubmit(Object.assign({}, this.state));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {React.Children.map(this.props.children, (child) => {
          return (
            <div className={child.props.className}>
              {React.Children.map(child.props.children, (subchild) => {
                if (subchild.type === 'input' && subchild.props.name) {
                  return React.cloneElement(subchild, {
                    onChange: this.onChange,
                    value: this.state[subchild.props.name]
                  });
                }
                return subchild;
              })}
            </div>
          );
        })}
      </form>
    );
  }
}

const stateFromChildren = (children) => {
  let state = {};

  React.Children.forEach(children, (child) => {
    if (child.type === 'input' && child.props.name) {
      state[child.props.name] = '';
    }
    else if (child.type === 'div') {
      React.Children.forEach(child.props.children, (subchild) => {
        if (subchild.type === 'input' && subchild.props.name) {
          state[subchild.props.name] = '';
        }
      });
    }
  });

  return state;
}