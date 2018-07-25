import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../assets/js/common';

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.updateChoices = this.updateChoices.bind(this)
  }
  updateChoices(e) {
    const { choices } = this.props

    switch (e.target.dataset.type) {
      case 'minus':
        choices.length > 2 && 
          this.props.update(choices.slice(0, choices.length - 1))
        break;
      case 'plus':
        choices.length < 8 && 
          this.props.update(choices.slice().concat([choices.length + 1]))
        break;
      default:
        break;
    }
  }
  render() {
    const { choices } = this.props

    return (
      <div>
        <p className="App-intro">How many choices do you have?</p>
        <div className="choices">
          <span className="modify-choice" data-type="minus" onClick={this.updateChoices}>-</span>
          <span className="choice-count">{ choices.length }</span>
          <span className="modify-choice" data-type="plus" onClick={this.updateChoices}>+</span>
        </div>
        <Link to={url('/')}>Home</Link>
      </div>
    )
  }
}
