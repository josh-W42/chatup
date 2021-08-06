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
  createNotification,
} from "./actions";
import { StoreState } from "./reducers";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import SocketAdapter from "./components/SocketAdapter";
import NotificationContainer from "./components/NotificationContainer";

interface AppProps {
  authorizeUser: typeof authorizeUser;
  unAuthorizeUser: typeof unAuthorizeUser;
  createNotification: typeof createNotification;
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
      // fetch user data to store in redux store
      props.fetchUser(payload, onFetchError);
    }
  }, []);

  const onFetchError = (): void => {
    setAuthToken(null);
    props.unAuthorizeUser();
    localStorage.removeItem("jwtToken");
    props.createNotification({
      info: "Session Has Expired Please Log Back In",
      severity: "error",
    });
  };

  return (
    <>
      <SocketAdapter />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/chats" component={ChatDashboard} />
      </Switch>
      <NotificationContainer />
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
  createNotification,
})(_App);

export default App;
