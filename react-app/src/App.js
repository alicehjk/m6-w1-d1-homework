import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import InventoryList from './InventoryList';
import InventoryEdit from './InventoryEdit';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/inventories" component={InventoryList} />
          <Route path="/inventories/:id" component={InventoryEdit} />
        </Switch>
      </Router>
    );
  }
}

export default App;
