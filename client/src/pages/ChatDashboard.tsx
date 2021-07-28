import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ChatDrawer from "../components/ChatDrawer";
import NewChatDialog from "../components/NewChatDialog";
import { StoreState } from "../reducers";

interface ChatDashboardProps {
  isAuth: boolean;
}

const _ChatDashboard = (props: ChatDashboardProps): JSX.Element => {
  if (!props.isAuth) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <>
      <ChatDrawer />
      <NewChatDialog />
    </>
  );
};

const mapStateToProps = ({ isAuth }: StoreState): { isAuth: boolean } => {
  return { isAuth };
};

const ChatDashboard = connect(mapStateToProps)(_ChatDashboard);

export default ChatDashboard;
