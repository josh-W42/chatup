import { Request, Response } from "express";
import { Chat, db, RequestWithBody, User } from "../models";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "../util/helper";

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
      [`${newChat.id}`]: user,
    });
  } catch (error) {
    handleError(error, 500, res);
  }
};

export default { createChat };
