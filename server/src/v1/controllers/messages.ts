import { Request, Response } from "express";
import { db, Message, RequestWithBody, User } from "../models";
import { handleError } from "../util/helper";

const createMessage = async (req: RequestWithBody, res: Response) => {
  const { content, sentGraphic, chatId } = req.body;
  const { id, userName, imageUrl } = req.user as User;

  // type guard possible undefined data
  if (!content || typeof sentGraphic !== "boolean" || !chatId) {
    return handleError(new Error("Invalid Input For Message"), 400, res);
  }

  try {
    // create new message
    const newMessage: Message = {
      id: "",
      author: userName,
      authorImageUrl: imageUrl,
      authorId: id,
      sentGraphic,
      content,
      graphicUrls: [],
      createdAt: new Date().getTime(),
    };

    const newMessageRef = await db.ref(`/messages/${chatId}`).push();
    newMessage.id = newMessageRef.key as string;
    newMessageRef.set(newMessage);

    // send back a response

    res.status(201).json({
      message: newMessage,
    });

    // update the chat
    db.ref(`/chats/${chatId}`).update({
      lastUpdated: new Date().getTime(),
      lastMessage: newMessage.content,
    });
  } catch (error) {
    handleError(error, 500, res);
  }
};

export default { createMessage };
