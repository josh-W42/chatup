import { Response } from "express";
import { Chat, db, Message } from "../models";

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
      .orderByChild("lastUpdated")
      .once("value");

    if (typeof chatsSnapshot.val() === "string") {
      return [];
    } else {
      const chats: Chat[] = [];

      chatsSnapshot.forEach((dataSnapshot) => {
        chats.push(dataSnapshot.val());
      });

      return chats.reverse();
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getAllMessages = async (id: string) => {
  try {
    const messagesSnapshot = await db
      .ref(`/messages/${id}`)
      .orderByChild("createdAt")
      .once("value");

    if (typeof messagesSnapshot === "string") {
      return [];
    } else {
      const messages: Message[] = [];

      messagesSnapshot.forEach((dataSnapshot) => {
        messages.push(dataSnapshot.val());
      });

      messages.reverse();

      return messages;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};
