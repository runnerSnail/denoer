import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom"; // BrowserRouter
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'

import routes from './routes'
import './styles/base.sass'

const App = ({ ...args }) => {
  useEffect(() => {
    args.init()
  })
  return (
    <Router>
      <Switch>{renderRoutes(routes)}</Switch>
    </Router>
  )
}

const mapToState = (): object => ({})
const mapToDispatch = ({ user }): object => ({
  init: user.init
})

export default connect(mapToState, mapToDispatch)(App)
