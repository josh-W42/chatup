import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ChatPartial, User, addChatPartial } from "../../actions";
import { StoreState } from "../../reducers";
import { fetchChatPartials, joinChat } from "../../adapters";
import { Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";

interface SearchBarProps {
  user: User;
  addChatPartial: typeof addChatPartial;
}

const _SearchBar = (props: SearchBarProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ChatPartial[]>([]);
  const [value, setValue] = useState("");
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    fetchChatPartials(onFetchFailure, onFetchSuccess);

    return () => {
      active = false;
    };
  }, [loading]);

  const onFetchSuccess = (chats: ChatPartial[]) => {
    setOptions(chats);
  };

  const onFetchFailure = () => {
    //trigger a warning notification
  };

  const handleJoin = () => {
    const el = document.querySelector("#chatSearch") as HTMLInputElement;
    if (el !== null) {
      const input = el.value;
      const id = options.filter((chat) => chat.name === input)[0].id;
      if (id) {
        joinChat(id, onJoinFailure, onJoinSuccess);
      }
    }
  };
  const onJoinFailure = () => {
    // trigger warning notification
  };

  const onJoinSuccess = (chat: ChatPartial) => {
    props.addChatPartial(chat);
  };

  return (
    <>
      <Grid container direction="row">
        <Autocomplete
          id="chatSearch"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              id="chatSearchInput"
              label="Chats Listed Here"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Button onClick={handleJoin}>JOIN</Button>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ user }: StoreState): { user: User } => {
  return { user };
};

const SearchBar = connect(mapStateToProps, {
  addChatPartial,
})(_SearchBar);

export default SearchBar;
