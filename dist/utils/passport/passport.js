"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPassportStrategy = void 0;
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const UserModel_1 = require("../../Persistance/UserModel");
exports.applyPassportStrategy = (passport) => {
    const JWStrategy = passport_jwt_1.default.Strategy;
    const ExtractJWT = passport_jwt_1.default.ExtractJwt;
    passport.use(new JWStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'testing123'
    }, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.getUserByEmail(jwtPayload.email_address);
            if (user) {
                return done(null, {
                    email_address: user.email_address,
                    _id: user.id
                });
            }
            return done(null, false);
        }
        catch (err) {
            return done(err);
        }
    })));
};
