import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { openNewChat, closeNewChat } from "../../actions";

interface DialogProps {
  newChatOpen: boolean;
  openNewChat: typeof openNewChat;
  closeNewChat: typeof closeNewChat;
}

const _NewChatDialog = (props: DialogProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={props.newChatOpen}
        onClose={props.closeNewChat}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.closeNewChat}>
            Disagree
          </Button>
          <Button autoFocus onClick={props.closeNewChat}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({
  newChatOpen,
}: StoreState): { newChatOpen: boolean } => {
  return { newChatOpen };
};

const NewChatDialog = connect(mapStateToProps, { openNewChat, closeNewChat })(
  _NewChatDialog
);

export default NewChatDialog;
