import { Action, ActionTypes } from "../actions";

export const authReducer = (
  state: boolean = localStorage.getItem("jwtToken") !== null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.authorizeUser:
      return action.payload;
    case ActionTypes.unAuthorizeUser:
      return action.payload;
    default:
      return state;
  }
};
