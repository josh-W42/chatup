import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { db, User } from "../models";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Using JSON Web Token Strategy for Passport

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

interface Payload {
  id: number;
  userName: string;
}

export default (passport: PassportStatic): void => {
  passport.use(
    new Strategy(
      options,
      async (jwt_payload: Payload, done: VerifiedCallback) => {
        try {
          const user: User | undefined = db.users.get(jwt_payload.userName);

          if (user) {
            return done(null, user);
          } else {
            throw new Error("No User Found");
          }
        } catch (error) {
          console.error(error);
          return done(null, false);
        }
      }
    )
  );
};
