import React from 'react'
import { Link } from 'react-router-dom'
import { url } from '../assets/js/common';

export default () => {
  return (
    <div>
      <p className="App-intro">1. Set up your choices.</p>
      <p className="App-intro">2. Release the ball.</p>
      <p className="App-intro">3. From your plinko!</p>
      <Link to={url('/')}>Home</Link>
    </div>
  )
}
