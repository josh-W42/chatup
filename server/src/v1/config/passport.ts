import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { db, User, Payload } from "../models";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Using JSON Web Token Strategy for Passport

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export default (passport: PassportStatic): void => {
  passport.use(
    new Strategy(
      options,
      async (jwt_payload: Payload, done: VerifiedCallback) => {
        try {
          const foundUserRef = db.ref(`/users/${jwt_payload.userName}`);

          const dbSnapshot = await foundUserRef.once("value");

          if (dbSnapshot.exists()) {
            return done(null, dbSnapshot.val() as User);
          } else {
            throw new Error("No User Found");
          }
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );
};
