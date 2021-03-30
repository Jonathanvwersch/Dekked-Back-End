'use strict';
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
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateBinder = exports.getBinderById = exports.getBindersByUserId = exports.createBinder = void 0;
const database_1 = __importDefault(require('./database'));
function createBinder(folder_id, name, owner_id, color) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const binder = yield database_1.default
        .table('binders')
        .insert({ folder_id, name, owner_id, color }, ['*']);
      console.log(binder);
      return binder[0];
    } catch (err) {
      console.log(err);
      throw new Error('There was an error creating binder');
    }
  });
}
exports.createBinder = createBinder;
function getBindersByUserId(user_id) {
  return __awaiter(this, void 0, void 0, function* () {
    console.log(user_id);
    try {
      const binder = yield database_1.default
        .table('binders')
        .select('*')
        .where({ owner_id: user_id });
      return binder;
    } catch (err) {
      console.log(err);
      throw new Error('Error getting binders by user id');
    }
  });
}
exports.getBindersByUserId = getBindersByUserId;
function getBinderById(id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const binder = yield database_1.default.table('binders').select('*').where({ id }).first();
      return binder;
    } catch (err) {
      console.log(err);
      throw Error('Error getting binder by id');
    }
  });
}
exports.getBinderById = getBinderById;
function updateBinder({ binder_id, owner_id, color, name }) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield database_1
        .default('binders')
        .update({ name, color })
        .where({ id: binder_id, owner_id });
    } catch (err) {
      console.log(err);
      throw Error('There was an error updating binder');
    }
  });
}
exports.updateBinder = updateBinder;
exports.default = {
  updateBinder,
  createBinder,
  getBinderById,
  getBindersByUserId
};
