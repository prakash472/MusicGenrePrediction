import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Demo from "./components/Demo";
import Predict from "./components/predict";
import HomePage from "./components/HomePage";
function App() {
  const [songs] = useState([]);
  return (
    <div className="App">
      {/* <Demo /> */}
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/music">
            <MusicPlayer />
          </Route>
          <Route path="/predict">
            <Predict />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
