import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Home from './Home'
import About from './About'
import Settings from './Settings'
import { url } from '../assets/js/common'

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
              <Link className="App-link" to={url('/')}>Home</Link>
              <Link className="App-link" to={url('/about')}>About</Link>
              <Link className="App-link" to={url('/settings')}>Settings</Link>
            </div>
          </header>

          <Switch>
            <Route path={url('/about')} component={About} />
            <Route path={url('/settings')} component={Settings} />
            <Route path={url('/')} component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
