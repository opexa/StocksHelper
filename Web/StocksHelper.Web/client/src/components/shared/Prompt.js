import React, { Component } from 'react';

export default class Prompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  componentDidMount = () => setTimeout(() => this.showPrompt(), 500)

  onCancel = () => {
    this.hidePrompt();
    setTimeout(() => this.props.cancel(), 1000);
  }
  
  onConfirm = () => {
    this.hidePrompt();
    setTimeout(() => this.props.confirm(), 1000);
  }

  showPrompt = () => this.setState({ visible: true });
  hidePrompt = () => this.setState({ visible: false });
  
  render() {
    return (
      <div className={`prompt-wrapper ${this.state.visible ? 'visible' : ''}`}>
        <div className='prompt border box-shadow'>
          <h4 className="prompt-title">{this.props.title}</h4>
          <div className="prompt-message">{this.props.message}</div>
          <div className="prompt-controls">
            <div className="btn btn-outline-primary" onClick={this.onCancel}>Cancel</div>
            <div className="btn btn-outline-success" onClick={this.onConfirm}>Confirm</div>
          </div>
        </div>
      </div>
    );
  }
}