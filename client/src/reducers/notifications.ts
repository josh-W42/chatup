import { Action, ActionTypes, Notification } from "../actions";

export const notificationReducer = (
  state: Notification[] = [],
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.createNotification:
      return state.concat([action.payload]);
    case ActionTypes.resetNotifications:
      return state.slice(1);
    default:
      return state;
  }
};
