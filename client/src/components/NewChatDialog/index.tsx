import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import {
  openNewChat,
  closeNewChat,
  addChatPartial,
  ChatPartial,
} from "../../actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  useMediaQuery,
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";
import { ChatPartialPayload, postChatPartial } from "../../adapters";

interface DialogProps {
  newChatOpen: boolean;
  openNewChat: typeof openNewChat;
  closeNewChat: typeof closeNewChat;
  addChatPartial: typeof addChatPartial;
}

interface DialogState {
  name: string;
  imageUrl: string;
}

const _NewChatDialog = (props: DialogProps): JSX.Element => {
  const [values, setValues] = useState<DialogState>({
    name: "",
    imageUrl: "",
  });

  const handleChange =
    (prop: keyof DialogState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClose = () => {
    props.closeNewChat();
    reset();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setValues({ ...values, imageUrl: URL.createObjectURL(fileList[0]) });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newChat: ChatPartialPayload = {
      name: values.name,
    };

    postChatPartial(newChat, onPostFailure, onPostSuccess);
    props.closeNewChat();
    reset();
  };

  const onPostSuccess = (newChat: ChatPartial) => {
    props.addChatPartial(newChat);
  };

  const onPostFailure = () => {
    // trigger a warning notification
  };

  const reset = () => {
    setValues({
      name: "",
      imageUrl: "",
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={props.newChatOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="responsive-dialog-title">
            {"Start A New Chat"}
          </DialogTitle>
          <DialogContent sx={{ m: 5 }}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="name">Chat Name</InputLabel>
              <Input
                id="name"
                type="text"
                required
                value={values.name}
                onChange={handleChange("name")}
              />
            </FormControl>
            <FormControl sx={{ marginY: 5, width: "100%" }} variant="standard">
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    src={values.imageUrl}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="p">
                    Chat Image
                  </Typography>
                  <input
                    onChange={handleImageUpload}
                    accept="image/*"
                    id="chatImage"
                    type="file"
                  />
                </Grid>
              </Grid>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="space-between">
              <Button
                autoFocus
                size="large"
                color="error"
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                tabIndex={-1}
                color="primary"
                autoFocus
                size="large"
                variant="contained"
              >
                <Input
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                  }}
                  disableUnderline={true}
                  type="submit"
                  value="CREATE"
                />
              </Button>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({
  newChatOpen,
}: StoreState): { newChatOpen: boolean } => {
  return { newChatOpen };
};

const NewChatDialog = connect(mapStateToProps, {
  openNewChat,
  closeNewChat,
  addChatPartial,
})(_NewChatDialog);

export default NewChatDialog;
