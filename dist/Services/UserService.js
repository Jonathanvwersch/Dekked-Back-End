"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../Persistance/UserModel");
function getUserByIdAsync(userId) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const user = yield UserModel_1.getUserById(userId);
      return {
        id: user.id,
        email_address: user.email_address,
        first_name: user.first_name,
        last_name: user.last_name,
      };
    } catch (error) {
      console.log(error);
      throw Error(
        `There was an error fetching data of user with id: ${userId}`
      );
    }
  });
}
function updateUserAsync({ first_name, last_name, email_address, id }) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield UserModel_1.updateUser({
        first_name,
        last_name,
        email_address,
        id,
      });
    } catch (error) {
      console.log(error);
      throw Error("There was an error updating user");
    }
  });
}
exports.default = {
  getUserByIdAsync,
  updateUserAsync,
};
