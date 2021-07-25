import ChatDrawer from "../components/ChatDrawer";
import NewChatDialog from "../components/NewChatDialog";

const ChatDashboard = (): JSX.Element => {
  return (
    <>
      <ChatDrawer />
      <NewChatDialog />
    </>
  );
};

export default ChatDashboard;
