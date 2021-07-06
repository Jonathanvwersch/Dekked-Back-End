"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudySetController = void 0;
const StudySetModel_1 = require("../Persistance/StudySetModel");
const PageService_1 = __importDefault(require("../Services/PageService"));
const StudySetService_1 = __importStar(require("../Services/StudySetService"));
const authHelpers_1 = require("../utils/passport/authHelpers");
class StudySetController {
  getStudySetsByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const userId = authHelpers_1.getUserIdFromRequest(req);
      try {
        const studySets = yield StudySetModel_1.getStudySetsByUserId(userId);
        const studyPackObject = StudySetService_1.createStudySetObject(
          studySets
        );
        return res.status(200).json({
          success: true,
          data: {
            studySets: studyPackObject,
          },
        });
      } catch (e) {
        return res.status(400).json({ success: false, error: e.message });
      }
    });
  }
  createStudySet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const userId = authHelpers_1.getUserIdFromRequest(req);
      const { binder_id, name, color, id } = req.body;
      try {
        const response = yield StudySetModel_1.createStudySet(
          binder_id,
          name,
          userId,
          color,
          id
        );
        yield PageService_1.default.createPage(id, undefined, userId);
        return res.status(200).json({
          success: true,
          data: {
            study_set: response,
          },
        });
      } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
  updateStudySet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const userId = authHelpers_1.getUserIdFromRequest(req);
      const { name, color, study_set_id } = req.body;
      try {
        yield StudySetService_1.default.updateStudySet({
          name,
          color,
          study_set_id,
          owner_id: userId,
        });
        return res.status(200).json({ success: true });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
  deleteStudySet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const userId = authHelpers_1.getUserIdFromRequest(req);
      const { study_set_id } = req.body;
      try {
        yield StudySetService_1.default.deleteStudySet({
          study_set_id,
          owner_id: userId,
        });
        return res.status(200).json({ success: true });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
}
exports.StudySetController = StudySetController;
