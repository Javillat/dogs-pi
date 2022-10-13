import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../src/components/home/Home";
import Detail from "../src/components/detail/Detail"
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
