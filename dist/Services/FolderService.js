"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createRecursively(pathArray, hierarchy, index) {
    const currentIndex = index ? index : 0;
    const prop = pathArray[currentIndex];
    if (!hierarchy[prop]) {
        hierarchy[prop] = {};
    }
    if (currentIndex === pathArray.length - 1)
        return;
    createRecursively(pathArray, hierarchy[prop], currentIndex + 1);
}
function createFolderHierarchyObject(folders) {
    let longestPath = 0;
    const pathArrays = folders.map((folder) => {
        const split = folder.path.split('.');
        if (split.length > longestPath)
            longestPath = split.length;
        return folder.path.split('.');
    });
    let hierarchy = {};
    for (let i = 0; i < pathArrays.length; i++) {
        createRecursively(pathArrays[i], hierarchy);
    }
    return { hierarchy, maxDepth: longestPath };
}
function createFolderObject(folders) {
    let folderObject = {};
    for (let i = 0; i < folders.length; i++) {
        const prop = folders[i].id.replace(/-/g, '');
        if (!folderObject[prop]) {
            folderObject[prop] = folders[i];
        }
    }
    return folderObject;
}
exports.default = {
    createFolderHierarchyObject,
    createFolderObject
};
