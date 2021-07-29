import { useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { StoreState } from "../../reducers";

const { REACT_APP_SOCKET_URL } = process.env;
console.log(REACT_APP_SOCKET_URL);
const socket = io(REACT_APP_SOCKET_URL as string, {
  reconnectionAttempts: 10,
  reconnectionDelay: 10000,
  reconnectionDelayMax: 10000,
});

interface SocketAdapterProps {
  isAuth: boolean;
}

const _SocketAdapter = (props: SocketAdapterProps): JSX.Element => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection established");
    });

    socket.on("disconnect", () => {
      console.log("connection terminated");
    });

    socket.on("message", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (props.isAuth) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [props.isAuth]);

  return <></>;
};

const mapStateToProps = ({ isAuth }: StoreState): { isAuth: boolean } => {
  return { isAuth };
};

const SocketAdapter = connect(mapStateToProps)(_SocketAdapter);

export default SocketAdapter;
