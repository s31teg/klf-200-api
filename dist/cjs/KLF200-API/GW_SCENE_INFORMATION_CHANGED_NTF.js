"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_SCENE_INFORMATION_CHANGED_NTF = exports.SceneChangeType = void 0;
const common_js_1 = require("./common.js");
var SceneChangeType;
(function (SceneChangeType) {
    SceneChangeType[SceneChangeType["Deleted"] = 0] = "Deleted";
    SceneChangeType[SceneChangeType["Modified"] = 1] = "Modified";
})(SceneChangeType || (exports.SceneChangeType = SceneChangeType = {}));
class GW_SCENE_INFORMATION_CHANGED_NTF extends common_js_1.GW_FRAME_NTF {
    SceneID;
    SceneChangeType;
    constructor(Data) {
        super(Data);
        this.SceneChangeType = this.Data.readUInt8(0);
        this.SceneID = this.Data.readUInt8(1);
    }
}
exports.GW_SCENE_INFORMATION_CHANGED_NTF = GW_SCENE_INFORMATION_CHANGED_NTF;
//# sourceMappingURL=GW_SCENE_INFORMATION_CHANGED_NTF.js.map