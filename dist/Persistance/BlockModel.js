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
const database_1 = __importDefault(require('./database'));
// Types: h1, bulleted_list, main_text...
function createBlock(page_id, draft_key, content, owner_id) {
  return __awaiter(this, void 0, void 0, function* () {
    const now = new Date();
    const response = yield database_1.default
      .table('blocks')
      .insert({ page_id, draft_key, content, owner_id, date_created: now, date_modified: now }, [
        'id'
      ]);
    if (response[0].id) {
      return response[0].id;
    }
    throw new Error('Error creating block');
  });
}
function getBlock(page_id, draft_key) {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield database_1.default
      .table('blocks')
      .select('*')
      .where({ draft_key, page_id });
    if (response.length) {
      return response[0];
    }
    throw new Error('Block not found');
  });
}
function updateBlock({ id, page_id, draft_key, content }) {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield database_1.default
      .table('blocks')
      .update({ content })
      .where({ draft_key, page_id });
    return response;
  });
}
function getBlocksInPage(page_id) {
  return __awaiter(this, void 0, void 0, function* () {
    const response = yield database_1.default.table('blocks').select('*').where('page_id', page_id);
    return response;
  });
}
function deleteBlock(id, owner_id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield database_1.default.table('blocks').delete('*').where({ id, owner_id });
    } catch (error) {
      throw Error('There was an error deleting block');
    }
  });
}
exports.default = {
  createBlock,
  getBlock,
  updateBlock,
  getBlocksInPage
};
