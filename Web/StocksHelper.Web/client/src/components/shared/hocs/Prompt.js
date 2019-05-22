import React, { Component, Fragment } from 'react';

export default class Prompt extends Component {
  constructor(props) {
    super(props);

    this.prompt = React.createRef();

    this.state = {
      visible: false
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
    setTimeout(() => this.showPrompt(), 500);
  }

  componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClickOutside);

  handleClickOutside = (event) => {
    if (this.prompt && !this.prompt.current.contains(event.target)) {
      this.onCancel();
    }
  }

  onCancel = () => {
    this.hidePrompt();
    setTimeout(() => this.props.cancel(), 500);
  }

  onConfirm = () => {
    this.hidePrompt();
    setTimeout(() => this.props.confirm(), 500);
  }

  showPrompt = () => this.setState({ visible: true });
  hidePrompt = () => this.setState({ visible: false });

  render() {
    return (
      <div className={`prompt-wrapper ${this.state.visible ? 'visible' : ''}`}>
        <div className={`prompt border box-shadow ${this.props.className}`} ref={this.prompt}>
          {this.props.enableClose ? <i className="fas fa-times close-prompt-btn" onClick={this.onCancel}></i> : ''}
          {
            this.props.children ||
            <Fragment>
              <h4 className="prompt-title">{this.props.title}</h4>
              <div className="prompt-message">{this.props.message}</div>
              <div className="prompt-controls">
                <div className="btn btn-outline-primary" onClick={this.onCancel}>Cancel</div>
                <div className="btn btn-outline-success" onClick={this.onConfirm}>Confirm</div>
              </div>
            </Fragment>
          }
        </div>
      </div>
    );
  }
}