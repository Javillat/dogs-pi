import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../src/components/home/Home";
import Detail from "../src/components/detail/Detail"
//import Nav from '../src/components/nav/Nav'
import "./App.css";
import LandingPage from "./components/landing/Landing";
import CreateBreed from "./components/form/Createbreed";
import Favorites from "./components/favorites/Favorites";

function App() {
  return (
    <div className="App">
       <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/create">
          <CreateBreed />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
