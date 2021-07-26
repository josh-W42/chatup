import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatDashboard from "./pages/ChatDashboard";
import Home from "./pages/Home";

interface AppProps {}

function App(props: AppProps): JSX.Element {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chats" component={ChatDashboard} />
      </Switch>
    </>
  );
}

export default App;
