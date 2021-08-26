import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { NewContentPayload, addMessage, Chat } from "../../actions";
import { StoreState } from "../../reducers";

const { REACT_APP_SOCKET_URL } = process.env;

const socket = io(REACT_APP_SOCKET_URL as string, {
  reconnectionAttempts: 10,
  reconnectionDelay: 10000,
  reconnectionDelayMax: 10000,
});

interface SocketAdapterProps {
  isAuth: boolean;
  chat: Chat;
  addMessage: typeof addMessage;
}

export const emitSocketEvent = (event: string, data: any) => {
  socket.emit(event, data);
};

const _SocketAdapter = (props: SocketAdapterProps): JSX.Element => {
  const [oldChat, setOldChat] = useState("");

  useEffect(() => {
    socket.on("update messages", (data: NewContentPayload) => {
      props.addMessage(data.message, data.chatId);
    });

    return () => {
      socket.off("update messages");
    };
  }, []);

  useEffect(() => {
    socket.emit("leave room", { id: oldChat });
    socket.emit("join room", { id: props.chat.id });

    setOldChat(props.chat.id);
  }, [props.chat]);

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
  chat,
}: StoreState): { isAuth: boolean; chat: Chat } => {
  return { isAuth, chat };
};

const SocketAdapter = connect(mapStateToProps, { addMessage })(_SocketAdapter);

export default SocketAdapter;
