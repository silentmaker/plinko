import React, { Component } from 'react'
import Matter from 'matter-js'

import pokeBall from '../assets/images/pokeball.png'

const { Engine, Render, Runner, Composites, World, Bodies, Common } = Matter

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      columns: 12,
      engine: {},
      runner: {},
      render: {},
      ball: {}
    }
    this.init = this.init.bind(this)
    this.run = this.run.bind(this)
    this.stop = this.stop.bind(this)
    this.release = this.release.bind(this)
  }
  componentDidMount() {
    const { innerWidth, innerHeight } = window
    const engine = Engine.create()
    const runner = Runner.create()
    const render = Render.create({
      element: document.getElementById('game'),
      engine: engine,
      options: {
        width: innerWidth,
        height: innerHeight,
        background: '#ffffff',
        wireframes: false
      }
    })
    
    this.setState({
      width: innerWidth,
      height: innerHeight,
      engine: engine,
      runner: runner,
      render: render
    }, () => {
      this.init()
      this.run()
    })
  }
  randomColor() {
    return Common.choose(['#86C9F7', '#99E1BA', '#C1CBE6', '#F7DD8F']);
  }
  init() {
    const { width, height, columns, engine } = this.state
    const { choices } = this.props
    const radius = width / columns
    const gap = width / choices.length
    const ground = Bodies.rectangle(width / 2, height, width, 8, { isStatic: true, render: {fillStyle: '#F4D397'} })
    const leftWall = Bodies.rectangle(0, height / 2, 1, height, { isStatic: true })
    const rightWall = Bodies.rectangle(width, height / 2, 1, height, { isStatic: true })
    const bars = Composites.stack(radius / 2, 80, columns, columns + 2, radius - 8, radius - 8, (x, y) => {
      return (y - 80 )/ radius % 2 === 1 && x === radius / 2 ? 
        Bodies.circle(x - radius / 2, y, 4, { render: {visible: false} }) : 
        Bodies.circle(x, y, 4, { isStatic: true, render: {fillStyle: this.randomColor()} })
    })
    const walls = Composites.stack(gap, height - 120, choices.length - 1, 1, gap - 2, 0, (x, y) => {
      return Bodies.rectangle(x, y, 2, 120, { isStatic: true, render: {fillStyle: '#F4D397'} })
    })

    World.add(engine.world, [ground, leftWall, rightWall, bars, walls])
  }
  release() {
    const { width, columns, engine, ball } = this.state
    const radius = width / columns
    const ballOption = {
      density: 0.2,
      render: {
        sprite: {
          texture: pokeBall,
          xScale: (radius - 8) / 64,
          yScale: (radius - 8) / 64
        }
      }
    }
    const newBall = Bodies.circle(width * Math.random(), 0, (radius - 8) / 2, ballOption)

    if (this.state.ball.id) {
      World.remove(engine.world, [ball])
    }
    World.add(engine.world, [newBall])
    this.setState({ ball: newBall })
  }
  run() {
    Runner.run(this.state.runner, this.state.engine)
    Render.run(this.state.render)
  }
  stop() {
    Runner.stop(this.state.runner, this.state.engine)
    Render.stop(this.state.render)
  }
  render() {
    const { choices } = this.props
    const choicesList = choices.map(item => <li key={item}>{item}</li>)

    return (
      <div>
        <div className="release-ball" onClick={this.release}>Release Ball!</div>
        <div id="game"></div>
        <ul className="choice-list">{choicesList}</ul>
      </div>
    )
  }
}

export default Home