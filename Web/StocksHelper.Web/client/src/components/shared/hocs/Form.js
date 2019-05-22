import React, { Component } from 'react';

const formControls = ['input', 'textarea', 'select'];

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
                if (formControls.indexOf(subchild.type) > -1 && subchild.props.name) {
                  return React.cloneElement(subchild, {
                    onChange: (ev) => {
                      if (subchild.props.onChange !== undefined) {
                        subchild.props.onChange(ev);
                      }
                      this.onChange(ev);
                    },
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
    if (formControls.indexOf(child.type) > -1 && child.props.name) {
      state[child.props.name] = '';
    }
    else if (child.type === 'div') {
      React.Children.forEach(child.props.children, (subchild) => {
        if (formControls.indexOf(subchild.type) > -1 && subchild.props.name) {
          state[subchild.props.name] = '';
        }
      });
    }
  });

  return state;
}