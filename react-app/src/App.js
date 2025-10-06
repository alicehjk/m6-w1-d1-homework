import React, { Component } from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";   // ✅ remove Router import
import InventoryList from "./InventoryList";
import InventoryEdit from "./InventoryEdit";
import './App.css';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inventories' element={<InventoryList />} />
        <Route path='/inventories/:id' element={<InventoryEdit />} />
      </Routes>
    );
  }
}

export default App;
