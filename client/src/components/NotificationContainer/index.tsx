import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/core/Alert";
import { Notification, resetNotifications } from "../../actions";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";

interface NotificationContainerProps {
  resetNotifications: typeof resetNotifications;
  notifications: Notification[];
}

const _NotificationContainer = (
  props: NotificationContainerProps
): JSX.Element => {
  if (props.notifications.length < 1) {
    return <></>;
  }
  const currentNotification =
    props.notifications[props.notifications.length - 1];
  const severity = currentNotification.severity;
  // let vertical = "top";
  // let horizontal = "center";

  // if (onMobile()) {
  //   vertical = "bottom";
  //   horizontal = "center";
  // }

  const handleCloseAlert = () => {
    props.resetNotifications();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={true}
      autoHideDuration={6000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        variant="filled"
        elevation={6}
        severity={severity}
      >
        {currentNotification.info}
      </MuiAlert>
    </Snackbar>
  );
};

const mapStateToProps = ({
  notifications,
}: StoreState): { notifications: Notification[] } => {
  return { notifications };
};

const NotificationContainer = connect(mapStateToProps, {
  resetNotifications,
})(_NotificationContainer);

export default NotificationContainer;
