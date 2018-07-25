import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Home from './Home'
import About from './About'
import Settings from './Settings'

import logo from '../assets/images/logo.svg'
import '../assets/styles/common.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} alt="logo" className="App-logo"/>
            <div>
              <Link className="App-link" to="/">Home</Link>
              <Link className="App-link" to="/About">About</Link>
              <Link className="App-link" to="/Settings">Settings</Link>
            </div>
          </header>

          <Switch>
            <Route path="/about" component={About} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
