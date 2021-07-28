import { ActionTypes } from "./types";

export interface AuthPayload {
  id: string;
  userName: string;
}

export interface AuthorizeUserAction {
  type: ActionTypes.authorizeUser;
  payload: boolean;
}

export interface UnAuthorizeUserAction {
  type: ActionTypes.unAuthorizeUser;
  payload: boolean;
}

export const authorizeUser = (): AuthorizeUserAction => {
  return {
    type: ActionTypes.authorizeUser,
    payload: true,
  };
};

export const unAuthorizeUser = (): UnAuthorizeUserAction => {
  return {
    type: ActionTypes.unAuthorizeUser,
    payload: false,
  };
};
