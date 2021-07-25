import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

interface AppProps {}

function App(props: AppProps): JSX.Element {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
