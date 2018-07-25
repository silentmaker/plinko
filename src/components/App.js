import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import Home from './Home'
import About from './About'
import Settings from './Settings'
import { url } from '../assets/js/common'

import logo from '../assets/images/joystick.png'
import '../assets/styles/common.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      choices: [1,2,3,4,5]
    }
    this.updateChoices = this.updateChoices.bind(this)
  }
  updateChoices(choices) {
    this.setState({ choices });
  }
  render() {
    const { choices } = this.state

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} alt="logo" className="App-logo"/>
            <div className="App-title">Plinko!</div>
            <Link to={url('/settings')} className="App-link">settings</Link>
            <Link to={url('/about')} className="App-link">about</Link>
          </header>

          <Switch>
            <Route path={url('/about')} component={About} />
            <Route path={url('/settings')} render={(props) => 
              <Settings {...props} choices={choices} update={this.updateChoices} />} />
            <Route path={url('/')} render={(props) => 
              <Home {...props} choices={choices} update={this.updateChoices} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
