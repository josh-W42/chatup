import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatDashboard from "./pages/ChatDashboard";
import Home from "./pages/Home";
import { connect } from "react-redux";
import {
  authorizeUser,
  AuthPayload,
  unAuthorizeUser,
  fetchUser,
} from "./actions";
import { StoreState } from "./reducers";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";

interface AppProps {
  authorizeUser: typeof authorizeUser;
  unAuthorizeUser: typeof unAuthorizeUser;
  fetchUser: Function;
  isAuth: boolean;
}

function _App(props: AppProps): JSX.Element {
  useEffect(() => {
    // Handle local authorization
    let payload: AuthPayload;
    const storageToken = localStorage.getItem("jwtToken");

    // set authorization header
    setAuthToken(storageToken);

    if (!storageToken) {
      // set app state in store to not authorized, trigger login
      props.unAuthorizeUser();
    } else {
      payload = jwt_decode(storageToken);
      // change auth state
      props.authorizeUser();
      // fetch userdata to store in redux store
      props.fetchUser(payload, onFetchError);
    }
  }, []);

  const onFetchError = (): void => {
    setAuthToken(null);
    props.unAuthorizeUser();
    localStorage.removeItem("jwtToken");
  };

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/chats" component={ChatDashboard} />
      </Switch>
    </>
  );
}

const mapStateToProps = ({ isAuth }: StoreState): { isAuth: boolean } => {
  return { isAuth };
};

const App = connect(mapStateToProps, {
  authorizeUser,
  unAuthorizeUser,
  fetchUser,
})(_App);

export default App;
