import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <Router>
      <Switch>
        <div className="Allpage">
          <Route exact path="/" component={Home} />
          <Route exact path="/:roomId" component={ChatRoom} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
