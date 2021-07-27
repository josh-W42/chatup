import { useEffect, useState } from "react";
import ChatDrawer from "../components/ChatDrawer";
import NewChatDialog from "../components/NewChatDialog";

const ChatDashboard = (): JSX.Element => {
  const [chatListChanged, setChatListChanged] = useState(false);

  useEffect(() => {
    if (chatListChanged) {
      alert("chat updated");
      setChatListChanged(false);
    }
  }, [chatListChanged]);

  return (
    <>
      <ChatDrawer />
      <NewChatDialog setChatListChanged={setChatListChanged} />
    </>
  );
};

export default ChatDashboard;
