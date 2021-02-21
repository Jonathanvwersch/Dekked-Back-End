"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBinderObject = void 0;
function createBinderObject(binders) {
    let binderObject = {};
    binders.forEach((val) => {
        binderObject[val.id] = val;
    });
    return binderObject;
}
exports.createBinderObject = createBinderObject;
