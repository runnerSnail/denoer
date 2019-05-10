import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// 引入 container 组件 CountCon
import CountCon from './container/CounterCon';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CountCon} />
      </Switch>
    </Router>
  );
}

export default App;
