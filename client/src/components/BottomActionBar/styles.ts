import { Theme } from "@material-ui/core";
import { drawerWidth } from "../ChatDrawer/styles";

export const calculateWidth = (isDrawerOpen: boolean, theme: Theme): string => {
  if (isDrawerOpen) {
    return `calc( 100% - ${drawerWidth}px)`;
  } else {
    return `calc( 100% - ${theme.spacing(10)})`;
  }
};
