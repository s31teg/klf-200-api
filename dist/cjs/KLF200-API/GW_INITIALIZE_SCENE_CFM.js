"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_INITIALIZE_SCENE_CFM = void 0;
const common_js_1 = require("./common.js");
const GW_SCENES_js_1 = require("./GW_SCENES.js");
class GW_INITIALIZE_SCENE_CFM extends common_js_1.GW_FRAME_CFM {
    Status;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
    }
    getError() {
        switch (this.Status) {
            case GW_SCENES_js_1.InitializeSceneConfirmationStatus.OK:
                throw new Error("No error.");
            case GW_SCENES_js_1.InitializeSceneConfirmationStatus.EmptySystemTable:
                return "Empty system table.";
            case GW_SCENES_js_1.InitializeSceneConfirmationStatus.OutOfStorage:
                return "Out of storage for scene.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
exports.GW_INITIALIZE_SCENE_CFM = GW_INITIALIZE_SCENE_CFM;
//# sourceMappingURL=GW_INITIALIZE_SCENE_CFM.js.map