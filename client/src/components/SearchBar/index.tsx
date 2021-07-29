import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ChatPartial } from "../../actions";
import { fetchChatPartials } from "../../adapters";

const SearchBar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly ChatPartial[]>([]);
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

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="chat search"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // isOptionEqualToValue={(option, value) => option.title === value.title}
      // getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
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
  );
};

export default SearchBar;
