import { AlertColor } from "@material-ui/core";
import { ActionTypes } from "./types";

export interface Notification {
  info: string;
  severity: AlertColor;
}

export interface CreateNotificationAction {
  type: ActionTypes.createNotification;
  payload: Notification;
}

export interface ResetNotificationsAction {
  type: ActionTypes.resetNotifications;
  payload: Notification[];
}

export const createNotification = (
  newNotification: Notification
): CreateNotificationAction => {
  return {
    type: ActionTypes.createNotification,
    payload: newNotification,
  };
};

export const resetNotifications = (): ResetNotificationsAction => {
  return {
    type: ActionTypes.resetNotifications,
    payload: [],
  };
};
