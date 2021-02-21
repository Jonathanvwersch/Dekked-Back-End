"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudyPackObject = void 0;
function createStudyPackObject(study_packs) {
    let studyPackObject = {};
    study_packs.forEach((val) => {
        studyPackObject[val.id] = val;
    });
    return studyPackObject;
}
exports.createStudyPackObject = createStudyPackObject;
