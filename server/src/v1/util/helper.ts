import { Response } from "express";
import { Chat, db } from "../models";

export const handleError = (
  err: Error,
  statusCode: number,
  res: Response
): void => {
  console.error(err.message);
  res.status(statusCode).json({
    message: err.message,
  });
};

export const getAllChats = async (userName: string) => {
  try {
    const chatsSnapshot = await db
      .ref(`/membersToChats/${userName}`)
      .once("value");

    if (typeof chatsSnapshot.val() === "string") {
      return [];
    } else {
      chatsSnapshot.forEach((snapShot) => {
        console.log(snapShot.val());
      });
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};
