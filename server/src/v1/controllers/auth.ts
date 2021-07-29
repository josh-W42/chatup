import { Request, Response } from "express";
import { db, Payload, RequestWithBody, User } from "../models";
import { v4 as uuidv4 } from "uuid";
import { getAllChats, handleError } from "../util/helper";
import { sign, verify } from "jsonwebtoken";
import { compare, genSalt, hash } from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

const test = (req: Request, res: Response): void => {
  // const dbRef = db.ref("/"); // a reference to the global db
  // try {
  //   dbRef.once("value", (data) => {
  //     return res.json({
  //       message: "Success",
  //       data,
  //     });
  //   });
  // } catch {
  //   res.json({
  //     message: "sFailure",
  //   });
  // }
  res.json({
    message: "success",
  });
};

const login = async (req: RequestWithBody, res: Response) => {
  const { userName, passWord } = req.body;

  // type guards
  if (!userName || !passWord) {
    return handleError(new Error("Invalid UserName or Password"), 400, res);
  }

  if (!JWT_SECRET) {
    return handleError(new Error("No Environment Variables"), 500, res);
  }

  const foundUserRef = db.ref(`/users/${userName}`);

  try {
    // find the user
    const dbSnapshot = await foundUserRef.once("value");

    if (!dbSnapshot.exists()) {
      return handleError(new Error("No User Found"), 400, res);
    }

    const user: User = dbSnapshot.val();

    // compare passwords
    const isValid = await compare(passWord, user.passWord);

    if (!isValid) {
      return handleError(new Error("Invalid Password"), 400, res);
    }

    // sign Json web tokens
    const payload: Payload = {
      id: user.id,
      userName: user.userName,
    };

    sign(payload, JWT_SECRET, { expiresIn: 7200 }, async (error, token) => {
      if (error) return handleError(error, 500, res);
      if (!token) return handleError(new Error("No Token Found"), 500, res);

      const verified = verify(token, JWT_SECRET);

      const chats = await getAllChats(user.userName);

      res.json({
        token: `Bearer ${token}`,
        user: { ...user, passWord: "", chats },
      });
    });
  } catch (error) {
    return handleError(error, 500, res);
  }
};

const signUp = async (req: RequestWithBody, res: Response) => {
  const { userName, passWord } = req.body;

  // type guard the input
  if (!userName || !passWord) {
    return handleError(new Error("Invalid UserName or Password"), 400, res);
  }

  const userRef = db.ref("/users");

  try {
    // check if username exists
    let foundUserRef = userRef.child(`/${userName}`);

    const foundUser = await foundUserRef.once("value");
    if (foundUser.exists()) {
      return handleError(new Error("Username Already Exists"), 400, res);
    }

    // if not, create new entry
    const newUser: User = {
      id: uuidv4(),
      userName,
      passWord,
      imageUrl: "",
      createdAt: new Date().getTime(),
    };

    // Salt and Hash passWord
    genSalt(12, (error, salt) => {
      if (error) return handleError(error, 500, res);

      hash(newUser.passWord, salt, async (error, hash) => {
        if (error) return handleError(error, 500, res);

        newUser.passWord = hash;

        // initialize a member to chat resource
        db.ref("/membersToChats").update({
          [`${newUser.userName}`]: "no chats",
        });

        // Save the user
        userRef.update(
          {
            [`${newUser.userName}`]: newUser,
          },
          (err) => {
            if (err) {
              // in the event of a failure, remove the previous resource.
              db.ref("/membersToChats").child(`${newUser.userName}`).remove();
            }
          }
        );

        res.status(201).json({
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
