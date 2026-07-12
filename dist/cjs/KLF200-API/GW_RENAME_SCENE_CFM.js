"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_RENAME_SCENE_CFM = void 0;
const common_js_1 = require("./common.js");
const GW_SCENES_js_1 = require("./GW_SCENES.js");
class GW_RENAME_SCENE_CFM extends common_js_1.GW_FRAME_CFM {
    Status;
    SceneID;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.SceneID = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case GW_SCENES_js_1.RenameSceneStatus.OK:
                throw new Error("No error.");
            case GW_SCENES_js_1.RenameSceneStatus.NameInUse:
                return "Name in use.";
            case GW_SCENES_js_1.RenameSceneStatus.InvalidSceneIndex:
                return "Invalid scene ID.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
exports.GW_RENAME_SCENE_CFM = GW_RENAME_SCENE_CFM;
//# sourceMappingURL=GW_RENAME_SCENE_CFM.js.map