import { PassportStatic } from "passport";
import passportJWT from "passport-jwt";
import { config } from "../../config";
import { getUserByEmail } from "../../Persistance/UserModel";

const { AUTHENTICATION_SECRET_KEY } = config;

export const applyPassportStrategy = (passport: PassportStatic) => {
  const JWStrategy = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;

  passport.use(
    new JWStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: AUTHENTICATION_SECRET_KEY,
      },
      async (jwtPayload, done) => {
        try {
          const user = await getUserByEmail(jwtPayload.email_address);
          if (user) {
            return done(null, {
              email_address: user.email_address,
              id: user.id,
            });
          }
          return done(null, false);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
