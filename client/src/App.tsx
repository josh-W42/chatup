import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatDashboard from "./pages/ChatDashboard";
import Home from "./pages/Home";

interface AppProps {}

function App(props: AppProps): JSX.Element {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/chats">
          <ChatDashboard />
        </Route>
      </Switch>
    </>
  );
}

export default App;
