import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { renderRoutes } from 'react-router-config'

import routes from './routes'
import './styles/base.sass'

// 引入 container 组件 CountCon
import CountCon from './container/CounterCon';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>{renderRoutes(routes)}</Switch>
    </Router>
  )
}

export default App
