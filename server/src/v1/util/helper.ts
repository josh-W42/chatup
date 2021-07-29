import { Response } from "express";
import { Chat, db, Message } from "../models";
import { DataSnapshot } from "@firebase/database-types";

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
      return toArray<Chat>(chatsSnapshot).reverse();
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
      return toArray<Message>(messagesSnapshot);
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const toArray = <T>(snapshot: DataSnapshot): T[] => {
  const output: T[] = [];
  snapshot.forEach((dataSnapshot) => {
    output.push(dataSnapshot.val());
  });
  return output;
};
