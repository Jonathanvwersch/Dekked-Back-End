import { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';
import { getUserByEmail } from '../../Persistance/UserModel';

export const applyPassportStrategy = (passport: PassportStatic) => {
  const JWStrategy = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;
  passport.use(
    new JWStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'testing123'
      },
      async (jwtPayload, done) => {
        try {
          const user = await getUserByEmail(jwtPayload.email_address);
          if (user) {
            return done(null, {
              email_address: user.email_address,
              _id: user.id
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
