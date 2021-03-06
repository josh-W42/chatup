import { json, Request, Response } from "express";
import { Chat, db, RequestWithBody, User } from "../models";
import { v4 as uuidv4 } from "uuid";
import { getAllMessages, handleError } from "../util/helper";
import { toArray } from "../util/helper";

const createChat = async (req: RequestWithBody, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return handleError(new Error("Invalid Chat Name"), 400, res);
  }

  const user = req.user as User;

  try {
    // create a new chat
    const newChat: Chat = {
      id: "",
      name,
      imageUrl: "",
      lastUpdated: new Date().getTime(),
      lastMessage: "",
    };

    const newChatRef = await db.ref("/chats").push();
    newChat.id = newChatRef.key as string;
    newChatRef.set(newChat);

    res.status(201).json({ chat: newChat });

    // create a link between the chat and the first member
    db.ref(`/membersToChats/${user.userName}`).update({
      [`${newChat.id}`]: newChat,
    });

    // remove password for security
    user.passWord = "";

    // create an opposing link
    db.ref("/chatsToMembers").update({
      [`${newChat.id}`]: { user },
    });

    // initialize the messages data
    db.ref("/messages").update({
      [`${newChat.id}`]: "no Messages",
    });
  } catch (error) {
    handleError(error, 500, res);
  }
};

const getChat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // check if the chat exists
    const chatSnapShot = await db.ref(`/chats/${id}`).once("value");
    if (!chatSnapShot.exists()) {
      return handleError(new Error("Chat Does Not Exist"), 400, res);
    }

    const chat: Chat = chatSnapShot.val();

    // get all messages
    const messages = await getAllMessages(chat.id);

    res.json({
      chat: { ...chat, messages },
    });
  } catch (error) {
    handleError(error, 500, res);
  }
};

const getAllChats = async (req: Request, res: Response) => {
  try {
    const chatsSnapshot = await db.ref("/chats").once("value");
    const chats = toArray<Chat>(chatsSnapshot);

    res.json({
      chats: chats,
    });
  } catch (error) {
    handleError(error, 500, res);
  }
};

const joinChat = async (req: Request, res: Response) => {
  const user = req.user as User;
  const { id } = req.params;

  try {
    // check if the chat exists
    const chatSnapShot = await db.ref(`/chats/${id}`).once("value");
    if (!chatSnapShot.exists()) {
      handleError(new Error("Chat does not exist"), 400, res);
    }

    // add the chat to the user
    user.passWord = "";
    db.ref(`/chatsToMembers/${id}`).update({
      [`${user.userName}`]: user,
    });

    // update associated table
    db.ref(`/membersToChats/${user.userName}`).update({
      [`${id}`]: chatSnapShot.val(),
    });

    res.json({
      chat: chatSnapShot.val(),
    });
  } catch (error) {
    handleError(error, 500, res);
  }
};

export default { createChat, getChat, getAllChats, joinChat };
