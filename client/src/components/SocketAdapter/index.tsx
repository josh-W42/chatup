import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Chat, Message, NewContentPayload } from "../../actions";
import { StoreState } from "../../reducers";

const { REACT_APP_SOCKET_URL } = process.env;

const socket = io(REACT_APP_SOCKET_URL as string, {
  reconnectionAttempts: 10,
  reconnectionDelay: 10000,
  reconnectionDelayMax: 10000,
});

interface SocketAdapterProps {
  isAuth: boolean;
  activeChat: string;
  chat: Chat;
}

export const emitSocketEvent = (event: string, data: any) => {
  socket.emit(event, data);
};

const _SocketAdapter = (props: SocketAdapterProps): JSX.Element => {
  const [oldChat, setOldChat] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      // console.log("connection established");
    });

    socket.on("disconnect", () => {
      // console.log("connection terminated");
    });

    socket.on("message", (data) => {
      // console.log(data);
    });

    socket.on("update messages", (data: NewContentPayload) => {
      props.chat.messages.push(data.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    socket.emit("leave room", { id: oldChat });
    socket.emit("join room", { id: props.activeChat });

    setOldChat(props.activeChat);
  }, [props.activeChat]);

  useEffect(() => {
    if (props.isAuth && socket.disconnected) {
      socket.connect();
    } else if (socket.connected) {
      socket.disconnect();
    }
  }, [props.isAuth]);

  return <></>;
};

const mapStateToProps = ({
  isAuth,
  activeChat,
  chat,
}: StoreState): { isAuth: boolean; activeChat: string; chat: Chat } => {
  return { isAuth, activeChat, chat };
};

const SocketAdapter = connect(mapStateToProps)(_SocketAdapter);

export default SocketAdapter;
