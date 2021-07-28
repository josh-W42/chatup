import { Request, Response } from "express";
import { db, RequestWithBody, User, uuid } from "../models";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "../util/helper";

const test = (req: Request, res: Response): void => {
  res.json({
    message: "Success",
  });
};

const login = (req: Request, res: Response): void => {
  res.json({
    message: "It worked!",
  });
};

const signUp = (req: RequestWithBody, res: Response): void => {
  const { userName, passWord } = req.body;

  console.log(userName, passWord);
  // type guard the input
  if (!userName || !passWord) {
    return handleError(new Error("Invalid UserName or Password"), 400, res);
  }

  try {
    // check if username exists
    if (db.users.has(userName)) {
      return handleError(new Error("Username Already Exists"), 400, res);
    }

    // if not, create new entry
    const newUser: User = {
      id: uuidv4() as uuid,
      userName,
      passWord,
      imageUrl: "",
      createdAt: new Date().getTime(),
    };

    // Salt and Hash passWord
    bcrypt.genSalt(12, (error, salt) => {
      if (error) return handleError(error, 500, res);

      bcrypt.hash(newUser.passWord, salt, async (error, hash) => {
        if (error) return handleError(error, 500, res);

        newUser.passWord = hash;
        // For now update fake db
        db.users.set(newUser.id, newUser);
        // TODO - Save to Firebase
        // newUser.passWord = "";
        // send to login route? or return? We'll see.
        // for now we'll just create a new object and send it back
        // but in the future we'll just return the obj.
        console.log(db);
        return res.status(201).json({
          created: { ...newUser, passWord: "", chats: [] },
        });
      });
    });
  } catch (error) {
    return handleError(error, 500, res);
  }
};

export default {
  login,
  test,
  signUp,
};
